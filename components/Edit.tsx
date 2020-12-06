import { Form, Input, Button, Typography, Select } from "antd";
import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addBoardAction,
  updateBoardAction,
  removeBoardAction,
  changeInputAction,
  changeSelectAction
} from "../reducers/board";
import Jodit from "./Jodit";
import { ICategory } from "../types/category";
import { RootState } from "../reducers";
import { useRouter } from "next/router";
import { UseInput } from "../hooks/common";

interface IProps {
  preset?: string;
}

const Edit = ({ preset = "none" }: IProps) => {
  const router = useRouter();
  const { id } = router.query;
  const { board, categories } = useSelector((state: RootState) => state.board);
  const useInput = UseInput();
  const dispatch = useDispatch();

  const onClickRemove = useCallback(async () => {
    if (id) {
      dispatch(removeBoardAction(id as string));
    }
  }, []);

  const onSubmit = useCallback(async () => {
    const dataForm = {
      title: board.data.title,
      content: board.data.content,
      categoryId: board.data.categoryId,
      hashtags: board.data.hashtags
    };

    if (id) {
      dispatch(updateBoardAction(id as string, dataForm));
    } else {
      dispatch(addBoardAction(dataForm));
    }
  }, [board]);

  const changeInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.persist) {
        event.persist();
      }

      useInput.change(changeInputAction, event);
    },
    [useInput]
  );

  const changeSelect = useCallback(
    value => {
      useInput.selectChange(changeSelectAction, value);
    },
    [useInput]
  );

  return (
    <Form name="boardForm" onFinish={onSubmit}>
      {preset === "inline" ? (
        <Typography.Title>
          {board?.data?.title === undefined ? "" : board.data.title}
        </Typography.Title>
      ) : (
        <Form.Item label="제목" rules={[{ required: true }]}>
          <Input
            name={"title"}
            value={board?.data?.title === undefined ? "" : board.data.title}
            onChange={changeInput}
          />
        </Form.Item>
      )}

      <Form.Item>
        <Select
          value={
            board?.data?.categoryId === undefined ? -1 : board.data.categoryId
          }
          onChange={changeSelect}
        >
          <Select.Option key={-1} value={-1}>
            선택
          </Select.Option>
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
          setContent={changeInput}
        />
      </Form.Item>
      <Form.Item>
        <Input
          name={"hashtags"}
          value={board?.data?.hashtags === undefined ? "" : board.data.hashtags}
          onChange={changeInput}
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
