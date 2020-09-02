import { Form, Input, Button, message, Typography, Select } from "antd";
import { ChangeEvent, useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import Router from "next/router";
import api from "../api";
import { useDispatch } from "react-redux";
import { addBoard } from "../reducers/board";

const importJodit = () => import("jodit-react");

const JoditEditor = dynamic(importJodit, {
  ssr: false,
});
interface ICategory {
  id: number;
  code: number;
  name: string;
}

interface IProps {
  param?: string | string[] | number;
  data?: any;
  preset?: string;
  disabled?: boolean;
  categories?: Array<ICategory>;
}

const useInput = (initValue: any) => {
  const [value, setValue] = useState(initValue);

  const initdata = useCallback((title) => {
    setValue(title);
  }, []);
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
      setValue(e.target.value);
    },
    [],
  );

  return { value, initdata, onChange };
};

const useSelectBox = (initValue: any) => {
  const [value, setValue] = useState(initValue);

  const initData = useCallback((categoryValue) => {
    setValue(categoryValue);
  }, []);

  const onChange = useCallback((value) => {
    setValue(value);
  }, []);

  return { value, onChange, initData };
};

const Edit = ({
  param,
  data,
  preset = "none",
  disabled = false,
  categories = [],
}: IProps) => {
  const dispatch = useDispatch();
  const title = useInput("");
  const categorySelect = useSelectBox("");
  const [content, setContent] = useState("");
  const [config, setConfig] = useState({
    preset,
    buttons: [
      "source",
      "|",
      "bold",
      "strikethrough",
      "underline",
      "italic",
      "eraser",
      "|",
      "superscript",
      "subscript",
      "|",
      "ul",
      "ol",
      "|",
      "outdent",
      "indent",
      "|",
      "font",
      "fontsize",
      "brush",
      "paragraph",
      "|",
      "image",
      "file",
      "video",
      "table",
      "link",
      "|",
      "align",
      "undo",
      "redo",
      "\n",
      "selectall",
      "cut",
      "copy",
      "paste",
      "copyformat",
      "|",
      "hr",
      "symbol",
      "fullsize",
      "print",
      "about",
    ],
    disabled: preset === "none" ? false : true,
    allowTabNavigation: true,
    addNewLineTagsTriggers: ["table", "iframe", "img", "hr", "jodit"],
    uploader: {
      url: `http://api.kohubi.xyz/images/upload`,
      insertImageAsBase64URI: false,
      imagesExtensions: ["jpg", "png", "jpeg", "gif"],
      headers: {
        Authorization: "zjdkjfkld",
      },
      filesVariableName(i: number): string {
        return `files`;
      },
      withCredentials: true,
      pathVariableName: "path",
      format: "json",
      method: "POST",
      prepareData: function (data: any) {
        return data;
      },
      isSuccess: function (resp: any) {
        return !resp.error;
      },
      process: function (resp: any) {
        return {
          fileName: resp[0],
          baseurl:
            "http://kohubi-renual-blog.s3-ap-northeast-1.amazonaws.com/images/",
        };
      },

      defaultHandlerSuccess: function (
        this: any,
        data: { fileName: string; baseurl: string },
      ) {
        setContent(
          `${this.value} <img src=${data.baseurl + data.fileName} />`,
        );
      },
    },
    readonly: false,
    showXPathInStatusbar: false,
    showCharsCounter: false,
    showWordsCounter: false,
    toolbarAdaptive: false,
    language: "ko",
    i18n: {
      ko: {
        "Insert Image": "이미지 삽입",
        "Font size": "글자 크기",
        "Font family": "폰트",
        undo: "이전",
        redo: "이후",
        Upload: "업로드",
        "Drop image": "이미지를 올리거나",
        "or click": "클릭해주세요.",
        Delete: "삭제",
        Edit: "수정",
        "Horizontal align": "정렬",
        Align: "글자 정렬",
        "Align Center": "중앙 정렬",
        "Align Left": "왼쪽 정렬",
        "Align Right": "오른쪽 정렬",
        "Align Justify": "저스티파이",
        Left: "왼쪽",
        Right: "오른쪽",
        Center: "중앙",
        Normal: "기본",
        "Image properties": "이미지 속성",
        Ok: "확인",
        Background: "배경색",
        Text: "글자색",
        "Fill color or set the text color": "색상변경",
      },
    },
    events: {
      async afterRemoveNode(node: any) {
        if (node.nodeName === "IMG") {
          //이미지 삭제시
          // 해당 seq의 파일이름에 해당하는 파일 삭제
          let imageKey = node.src.split("/");
          imageKey = imageKey[imageKey.length - 1];
          await api.destroy(`/images/${imageKey}`);
        }
      },
    },
    minWidth: "300px",
    minHeight: "300px",
    placeholder: "",
    toolbarButtonSize: "large",
  });
  const dataInit = useCallback(() => {
    if (data) {
      title.initdata(data.title);
      categorySelect.initData(data.categoryId);
      setContent(data.content);
    }
  }, [title, config, categorySelect]);

  useEffect(() => {
    dataInit();
  }, [data]);

  const onClickRemove = useCallback(async () => {
    const result = await api.destroy(`boards/${param}`);

    const { data, status: httpStatus } = result;

    if (httpStatus === 200) {
      message.success("삭제되었습니다.");
      Router.push("/boards");
    }
  }, []);

  const onSubmit = useCallback(async () => {
    const dataForm = {
      content,
      title: title.value,
      category: categorySelect.value,
    };

    let result;
    if (param) {
      result = await api.update(`/boards/${param}`, dataForm);
    } else {
      addBoard(dataForm);
      // result = await api.create("/boards", dataForm);
    }

    const { data, status: httpStatus } = result;
    if (httpStatus === 200) {
      if (param) {
        message.success("수정되었습니다.");
      } else {
        message.success("등록되었습니다.");
      }
      Router.push(`/boards/${data.data.id}`);
    }
  }, [content, title, categorySelect]);

  return (
    <Form name="boardForm" onFinish={onSubmit}>
      {preset === "inline"
        ? (
          <Typography.Title>{title.value}</Typography.Title>
        )
        : (
          <Form.Item label="제목" rules={[{ required: true }]}>
            <Input value={title.value} onChange={title.onChange} />
          </Form.Item>
        )}

      <Form.Item>
        <Select
          value={categorySelect.value}
          onChange={(value) => categorySelect.onChange(value)}
        >
          {categories &&
            categories.length > 0 &&
            categories.map((category: ICategory) => (
              <Select.Option
                key={category.id}
                value={category.code}
              >
                {category.name}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <JoditEditor
          value={content}
          config={config as any}
          onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
          onChange={(newContent) => {}}
        />
      </Form.Item>

      {param
        ? (
          <Form.Item>
            <Button type="primary" onClick={onSubmit}>
              수정
            </Button>
            <Button danger onClick={onClickRemove}>
              삭제
            </Button>
          </Form.Item>
        )
        : (
          <Form.Item>
            <Button type="primary" htmlType="submit">
              등록
            </Button>
          </Form.Item>
        )}
    </Form>
  );
};

export default Edit;
