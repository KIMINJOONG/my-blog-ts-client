import { Form, Input, Button, message } from "antd";
import { ChangeEvent, useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import Router from "next/router";
import api from "../api";
import Jodit from "jodit";

const importJodit = () => import("jodit-react");

const JoditEditor = dynamic(importJodit, {
    ssr: false,
});

interface IProps {
    param?: string | string[];
    data?: any;
    preset?: string;
    disabled?: boolean;
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

const Edit = ({ param, data, preset = "none", disabled = false }: IProps) => {
    const title = useInput("");
    const [content, setContent] = useState("");
    const [config, setConfig] = useState({
        preset,
        disabled: preset === "none" ? false : true,
        uploader: {
            url: `http://localhost:4000/images/upload`,
            insertImageAsBase64URI: false,
            imagesExtensions: ["jpg", "png", "jpeg", "gif"],
            headers: {
                Authorization: "zjdkjfkld",
            },
            filesVariableName(i: number): string {
                console.log("i : ", i);
                return `files`;
            },
            withCredentials: true,
            pathVariableName: "path",
            format: "json",
            method: "POST",
            prepareData: function (data: any) {
                console.log("prepareData : ", data);
                return data;
            },
            isSuccess: function (resp: any) {
                console.log("isSucess : ", resp);
                return !resp.error;
            },
            process: function (resp: any) {
                console.log("process : ", resp);
                return {
                    fileName: resp[0],
                    baseurl:
                        "https://kohubi-test.s3.ap-northeast-2.amazonaws.com/images/",
                };
            },

            defaultHandlerSuccess: function (
                this: any,
                data: { fileName: string; baseurl: string }
            ) {
                setContent(
                    `${this.value} <img src=${data.baseurl + data.fileName} />`
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
                    const result = await api.destroy(`/images/${imageKey}`);
                    console.log("result : ", result);
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
            setContent(data.content);
        }
    }, [title, config]);

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
        };

        let result;
        if (param) {
            result = await api.update(`/boards/${param}`, dataForm);
        } else {
            result = await api.create("/boards", dataForm);
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
    }, [content, title]);

    return (
        <Form name="boardForm" onFinish={onSubmit}>
            <Form.Item label="제목" rules={[{ required: true }]}>
                {preset === "inline" ? (
                    <p>{title.value}</p>
                ) : (
                    <Input value={title.value} onChange={title.onChange} />
                )}
            </Form.Item>
            <Form.Item>
                <JoditEditor
                    value={content}
                    config={config}
                    onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                    onChange={(newContent) => {}}
                />
            </Form.Item>

            {param ? (
                <Form.Item>
                    {preset === "inline" ? (
                        <Button
                            type="primary"
                            onClick={() => Router.push(`/boards/edit/${param}`)}
                        >
                            수정
                        </Button>
                    ) : (
                        <Button type="primary" onClick={onSubmit}>
                            수정
                        </Button>
                    )}

                    <Button type="danger" onClick={onClickRemove}>
                        삭제
                    </Button>
                </Form.Item>
            ) : (
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
