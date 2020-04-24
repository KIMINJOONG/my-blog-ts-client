import { Form, Input, Button, message } from "antd";
import {
    Dispatch,
    SetStateAction,
    ChangeEvent,
    useState,
    useCallback,
    useEffect,
} from "react";
import dynamic from "next/dynamic";
import jsCookie from "js-cookie";
import axios from "axios";
import Router from "next/router";

const importJodit = () => import("jodit-react");

const JoditEditor = dynamic(importJodit, {
    ssr: false,
});

const config = {
    uploader: { insertImageAsBase64URI: true },
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
    minWidth: "300px",
    minHeight: "300px",
    placeholder: "",
    toolbarButtonSize: "large",
};

interface IProps {
    param?: string | string[];
    data?: any;
}

const useInput = (initValue: any) => {
    const [value, setValue] = useState(initValue);

    const initdata = useCallback((title) => {
        setValue(title);
    }, []);
    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }, []);

    return { value, initdata, onChange };
};

const Edit = ({ param, data }: IProps) => {
    const title = useInput("");
    const [content, setContent] = useState("");
    const dataInit = useCallback(() => {
        if (data) {
            title.initdata(data.title);
            setContent(data.content);
        }
    }, [title]);

    useEffect(() => {
        dataInit();
    }, [data]);

    const onSubmit = useCallback(async () => {
        const dataForm = {
            content,
            title: title.value,
        };

        const token = jsCookie.get("token") ? jsCookie.get("token") : "";
        let result;
        if (param) {
            result = await axios.post(
                "http://localhost:4000/boards",
                dataForm,
                {
                    headers: {
                        Authorization: `token=${token}`,
                    },
                }
            );
        } else {
            result = await axios.put("http://localhost:4000/boards", dataForm, {
                headers: {
                    Authorization: `token=${token}`,
                },
            });
        }

        const { data, status: httpStatus } = result;
        if (httpStatus === 200) {
            if (param) {
                message.success("수정되었습니다.");
            } else {
                message.success("등록되었습니다.");
            }
            Router.push("/boards");
        }
    }, [content, title]);

    return (
        <Form name="boardForm" onFinish={onSubmit}>
            <Form.Item label="제목" rules={[{ required: true }]}>
                <Input value={title.value} onChange={title.onChange} />
            </Form.Item>
            <Form.Item>
                <JoditEditor
                    value={content}
                    config={config}
                    onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                    onChange={(newContent) => {}}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Edit;
