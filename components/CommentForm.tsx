import React, { useState, useCallback, useEffect } from "react";
import { Col, Card, Form, Input, Button, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { addCommentAction, updateCommentAction } from "../reducers/board";
import { RootState } from "../reducers";
import { IComment } from "../types/comment";

interface IProps {
  commentObject?: IComment | null;
}
const CommentForm = ({ commentObject = null }: IProps) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const { me } = useSelector((state: RootState) => state.user);
  const {
    board,
    addCommentLoading,
    addCommentDone,
    updateCommentLoading,
    updateCommentDone,
  } = useSelector(
    (state: RootState) => state.board,
  );
  const onSubmit = useCallback(
    () => {
      if (commentObject) {
        dispatch(updateCommentAction(comment, board.data.id, commentObject.id));
      } else {
        dispatch(addCommentAction(board.data.id, comment));
      }
    },
    [comment, commentObject],
  );

  useEffect(() => {
    if (addCommentDone) {
      setComment("");
    }
  }, [addCommentDone]);

  useEffect(() => {
    if (commentObject) {
      console.log(commentObject);
      setComment(commentObject.content);
    }
  }, []);

  return (
    <Col md={24} xs={24} sm={24} lg={24}>
      <Card>
        <Form.Item>
          <Input.TextArea
            rows={4}
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
        </Form.Item>

        <Form.Item>
          <Button
            htmlType="submit"
            loading={commentObject ? updateCommentLoading : addCommentLoading}
            onClick={onSubmit}
            type="primary"
            disabled={me && me.data ? false : true}
          >
            {commentObject ? "댓글수정" : "댓글등록"}
          </Button>
        </Form.Item>
      </Card>
    </Col>
  );
};

export default CommentForm;
