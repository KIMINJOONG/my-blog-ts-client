import { useState } from "react";
import dynamic from "next/dynamic";
import api from "../api";

const importJodit = () => import("jodit-react");

const JoditEditor = dynamic(importJodit, {
  ssr: false,
});

interface IProps {
  preset?: string;
  disabled?: boolean;
  content?: string;
  setContent?: any;
}

const Jodit = ({
  content = "",
  setContent = null,
  preset = "none",
  disabled = false,
}: IProps) => {
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

  return (
    <JoditEditor
      value={content}
      config={config as any}
      onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
      onChange={(newContent) => {}}
    />
  );
};

export default Jodit;
