import React, { useState, useCallback, useEffect } from "react";
import { Card, Comment, Button, message } from "antd";
import { removeCommentAction } from "../reducers/board";
import { useDispatch, useSelector } from "react-redux";
import CommentForm from "./CommentForm";
import { RootState } from "../reducers";

interface IUser {
  email: string;
  name: string;
}

interface IComment {
  id: number;
  content: string;
  createdAt: string;
  user: IUser;
  userId: number;
}

interface IProps {
  comment: IComment;
}
const CommentCard = ({ comment }: IProps) => {
  const { me } = useSelector((state: RootState) => state.user);
  const {
    board,
    removeCommentLoading,
    removeCommentDone,
    updateCommentDone,
  } = useSelector((state: RootState) => state.board);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const onClickEdit = useCallback(() => {
    setIsEditing(!isEditing);
  }, [isEditing]);

  const onClickRemoveComment = useCallback((commentId) =>
    () => {
      dispatch(removeCommentAction(board.data.id, commentId));
    }, []);

  useEffect(() => {
    if (updateCommentDone) {
      setIsEditing(false);
    }
  }, [updateCommentDone]);

  return (
    <Card key={comment.id}>
      <li>
        {isEditing ? (<CommentForm commentObject={comment} />) : (
          <Comment
            author={`${comment.user.email}(${comment.user.name})`}
            content={<p>{comment.content}</p>}
            datetime={comment.createdAt.substring(
              0,
              10,
            )}
          />
        )}

        {me && me.data && comment.userId === me.data.id && !isEditing && (
          <>
            <Button onClick={onClickEdit}>수정하기</Button>
            <Button
              onClick={onClickRemoveComment(comment.id)}
              type="danger"
              loading={removeCommentLoading}
            >
              삭제하기
            </Button>
          </>
        )}

        {isEditing && (
          <Button onClick={onClickEdit}>수정취소</Button>
        )}
      </li>
    </Card>
  );
};

export default CommentCard;
