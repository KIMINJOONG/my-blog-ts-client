import { useState, useEffect, useCallback } from "react";
import ReactHtmlParser from "react-html-parser";
import { Button, Card, List, Row, Col, message, Badge, Tag } from "antd";
import { FaRegThumbsUp } from "react-icons/fa";
import wrapper from "../../stores/configureStore";
import { END } from "redux-saga";
import {
  BOARD_DETAIL_REQUEST,
  addLikeAction,
  removeLikeAction,
  loadCategoriesAction
} from "../../reducers/board";
import { useSelector, useDispatch } from "react-redux";
import { LOAD_USER_REQUEST } from "../../reducers/user";
import axios from "axios";
import AppLayout from "../../components/AppLayout";
import styled from "styled-components";
import Head from "next/head";
import CommentForm from "../../components/CommentForm";
import CommentCard from "../../components/CommentCard";
import { RootState } from "../../reducers";
import { IComment } from "../../types/comment";
import Edit from "../../components/Edit";
import Link from "next/link";

const ContentCard = styled(Card)`
  word-break: break-word;
  & img {
    max-width: 100%;
  }

  & p {
    max-width: 100%;
  }

  & div {
    max-width: 100%;
    white-space: pre-wrap;
  }

  & pre {
    max-width: 100%;
    white-space: pre-wrap;
  }
`;
const edit = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state: RootState) => state.user);
  const [isUpdate, setIsUpdate] = useState(false);
  const {
    board,
    addLikeDone,
    removeLikeDone,
    removeCommentDone,
    updateBoardDone,
    updateBoardError,
    addBoardDone,
    addBoardError
  } = useSelector((state: RootState) => state.board);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    dispatch(loadCategoriesAction());
  }, []);

  useEffect(() => {
    for (let like of board.data.likes) {
      if (like.userId === me.data.id) {
        setIsLiked(true);
        return;
      }
    }

    setIsLiked(false);
  }, [addLikeDone, removeLikeDone]);

  useEffect(() => {
    if (addBoardDone) {
      message.success("게시글이 게시되었습니다.");
    }

    if (addBoardError) {
      message.error(addBoardError);
    }
  }, [addBoardDone, addBoardError]);

  useEffect(() => {
    if (updateBoardDone) {
      message.success("수정되었습니다.");
      setIsUpdate(false);
    }

    if (updateBoardError) {
      message.error(updateBoardError.msg);
    }
  }, [updateBoardDone, updateBoardError]);
  useEffect(() => {
    if (addLikeDone) {
      message.success("감사합니다.");
    }
  }, [addLikeDone]);

  useEffect(() => {
    if (removeLikeDone) {
      message.error("노력하겠습니다 ㅜ_ㅜ");
    }
  }, [removeLikeDone]);

  useEffect(() => {
    if (removeCommentDone) {
      message.error("댓글이 삭제되었습니다.");
    }
  }, [removeCommentDone]);

  const onClickHelped = useCallback(() => {
    if (!me || !me.data || !me.data.id) {
      message.error("로그인을 먼저 해주세요.");
      return;
    }

    if (isLiked) {
      dispatch(removeLikeAction(board.data.id));
    } else {
      dispatch(addLikeAction(board.data.id));
    }
  }, [board, isLiked]);

  return (
    <div>
      {isUpdate ? (
        <Edit />
      ) : (
        <>
          <Row>
            <Col md={24} xs={24} sm={24} lg={24}>
              <ContentCard title={board.data.title}>
                {board && ReactHtmlParser(board.data.content)}
                {board.data.boardHashtag?.map((hashtag: any) => (
                  <Tag>
                    <Link href={`/hashtag/${hashtag.name}`} prefetch={false}>
                      <a>#{hashtag.name}</a>
                    </Link>
                  </Tag>
                ))}
              </ContentCard>
            </Col>
          </Row>
          <Row>
            <Col
              md={24}
              xs={24}
              sm={24}
              lg={24}
              style={{ textAlign: "center", marginTop: "10px" }}
            >
              {isLiked ? (
                <Button
                  icon={<FaRegThumbsUp />}
                  type="primary"
                  onClick={onClickHelped}
                >
                  <span style={{ marginLeft: "5px" }}>
                    도움이 됐어요.
                    <Badge count={board.data.likes.length} />
                  </span>
                </Button>
              ) : (
                <Button
                  icon={<FaRegThumbsUp />}
                  type="primary"
                  ghost
                  onClick={onClickHelped}
                >
                  <span style={{ marginLeft: "5px" }}>
                    도움이 됐어요.
                    <Badge count={board.data.likes.length} />
                  </span>
                </Button>
              )}
            </Col>
          </Row>
          {me && me.data && me.data.role === 99 && (
            <Row>
              {isUpdate ? (
                <Col md={24} xs={24} sm={24} lg={24}>
                  <Button type="primary" onClick={() => setIsUpdate(true)}>
                    수정완료
                  </Button>
                  <Button type="danger" onClick={() => setIsUpdate(false)}>
                    수정취소
                  </Button>
                </Col>
              ) : (
                <Col md={24} xs={24} sm={24} lg={24}>
                  <Button type="primary" onClick={() => setIsUpdate(true)}>
                    수정
                  </Button>
                </Col>
              )}
            </Row>
          )}
          <Row>
            <Col md={24} xs={24} sm={24} lg={24}>
              <List
                className="comment-list"
                header={`${board.data.comments.length} replies`}
                itemLayout="horizontal"
                dataSource={board.data.comments}
                renderItem={(comment: IComment) => (
                  <CommentCard comment={comment} />
                )}
              />
            </Col>
          </Row>

          <Row>
            <CommentForm />
          </Row>
        </>
      )}
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context: any) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Authorization = "";
    axios.defaults.withCredentials = true;
    if (context.req && cookie) {
      axios.defaults.headers.Authorization = cookie;
    }
    context.store.dispatch({
      type: LOAD_USER_REQUEST
    });
    context.store.dispatch({
      type: BOARD_DETAIL_REQUEST,
      data: context.params.id
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default edit;
