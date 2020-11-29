import { Form, Input, Button, Typography, Select } from "antd";
import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addBoardAction,
  updateBoardAction,
  removeBoardAction
} from "../reducers/board";
import Jodit from "./Jodit";
import { ICategory } from "../types/category";
import { RootState } from "../reducers";
import { useRouter } from "next/router";

interface IProps {
  preset?: string;
}

const useSelectBox = (initValue: any) => {
  const [value, setValue] = useState(initValue);

  const initData = useCallback(categoryValue => {
    setValue(categoryValue);
  }, []);

  const onChange = useCallback(value => {
    setValue(value);
  }, []);

  return { value, onChange, initData };
};

const Edit = ({ preset = "none" }: IProps) => {
  const router = useRouter();
  const { id } = router.query;
  const { board, categories } = useSelector((state: RootState) => state.board);
  const dispatch = useDispatch();
  const categorySelect = useSelectBox("");

  const onClickRemove = useCallback(async () => {
    if (id) {
      dispatch(removeBoardAction(id as string));
    }
  }, []);

  const onSubmit = useCallback(async () => {
    const dataForm = {
      category: categorySelect.value
    };

    if (id) {
      dispatch(updateBoardAction(id as string, dataForm));
    } else {
      dispatch(addBoardAction(dataForm));
    }
  }, [board, categorySelect]);

  return (
    <Form name="boardForm" onFinish={onSubmit}>
      {preset === "inline" ? (
        <Typography.Title>
          {board?.data?.title === undefined ? "" : board.data.title}
        </Typography.Title>
      ) : (
        <Form.Item label="제목" rules={[{ required: true }]}>
          <Input
            value={board?.data?.title === undefined ? "" : board.data.title}
          />
        </Form.Item>
      )}

      <Form.Item>
        <Select
          value={
            board?.data?.categoryId === undefined ? -1 : board.data.categoryId
          }
          onChange={value => categorySelect.onChange(value)}
        >
          {categories &&
            categories.data.length > 0 &&
            categories.data.map((category: ICategory) => (
              <Select.Option key={category.id} value={category.code}>
                {category.name}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Jodit
          content={board?.data?.content === undefined ? "" : board.data.content}
        />
      </Form.Item>

      {id ? (
        <Form.Item>
          <Button type="primary" onClick={onSubmit}>
            수정
          </Button>
          <Button danger onClick={onClickRemove}>
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
