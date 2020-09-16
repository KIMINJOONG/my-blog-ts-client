import { Form, Input, Button, message, Typography, Select } from "antd";
import { ChangeEvent, useState, useCallback, useEffect } from "react";
import Router from "next/router";
import api from "../api";
import { useDispatch } from "react-redux";
import {
  addBoardAction,
  updateBoardAction,
  removeBoardAction,
} from "../reducers/board";
import Jodit from "./Jodit";

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
  categories = [],
}: IProps) => {
  const dispatch = useDispatch();
  const title = useInput("");
  const categorySelect = useSelectBox("");
  const [content, setContent] = useState("");
  const dataInit = useCallback(() => {
    if (data) {
      title.initdata(data.title);
      categorySelect.initData(data.categoryId);
      setContent(data.content);
    }
  }, [title, categorySelect]);

  useEffect(() => {
    dataInit();
  }, [data]);

  const onClickRemove = useCallback(async () => {
    if (param) {
      dispatch(removeBoardAction(param as string));
    }
  }, []);

  const onSubmit = useCallback(async () => {
    const dataForm = {
      content,
      title: title.value,
      category: categorySelect.value,
    };

    if (param) {
      dispatch(updateBoardAction(param as string, dataForm));
    } else {
      dispatch(addBoardAction(dataForm));
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
        <Jodit content={content} setContent={setContent} />
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
