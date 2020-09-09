import { useState, useEffect, useCallback, useContext } from "react";
import api from "../../api";
import ReactHtmlParser from "react-html-parser";
import {
  Button,
  Card,
  Input,
  Form,
  List,
  Comment,
  Row,
  Col,
  message,
  Badge,
} from "antd";
import Router from "next/router";
import { FaRegThumbsUp } from "react-icons/fa";
import wrapper from "../../stores/configureStore";
import { END } from "redux-saga";
import {
  BOARD_DETAIL_REQUEST,
  addLikeAction,
  removeLikeAction,
} from "../../reducers/board";
import { useSelector, useDispatch } from "react-redux";
import { LOAD_USER_REQUEST } from "../../reducers/user";
import axios from "axios";
import AppLayout from "../../components/AppLayout";
import styled from "styled-components";
import Head from "next/head";
import CommentForm from "../../components/CommentForm";

interface IBoard {
  content: string;
  createdAt: string;
  id: number;
  title: string;
  updatedAt: string;
  userId: number;
  likes: Array<ILikes>;
}

interface ILikes {
  boardId: number;
  userId: number;
}
interface IUser {
  email: string;
  name: string;
}
interface IComment {
  id: number;
  content: string;
  createdAt: string;
  user: IUser;
}

interface IProps {
  boardData: IBoard;
  id: string;
}

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
  const { me } = useSelector((state: any) => state.user);
  const { board, addLikeDone, removeLikeDone } = useSelector((state: any) =>
    state.board
  );
  const [isLiked, setIsLiked] = useState(false);

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
    if (addLikeDone) {
      message.success("감사합니다.");
    }
  }, [addLikeDone]);

  useEffect(() => {
    if (removeLikeDone) {
      message.error("노력하겠습니다 ㅜ_ㅜ");
    }
  }, [removeLikeDone]);

  const onClickHelped = useCallback(async () => {
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
    <AppLayout>
      <Head>
        <title>{board.data.title}</title>
        <meta
          property="og:title"
          content={board.data.title}
          key="title"
        />
        <meta name="subject" content={board.data.title} />
        <meta name="title" content={board.data.title} />
      </Head>
      <Row>
        <Col md={24} xs={24} sm={24} lg={24}>
          <ContentCard title={board.data.title}>
            {board && ReactHtmlParser(board.data.content)}
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
          {isLiked
            ? (
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
            )
            : (
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
      <Row>
        {me && me.data && me.data.role === 99 && (
          <Col md={24} xs={24} sm={24} lg={24}>
            <Button
              type="primary"
              onClick={() => Router.push(`/boards/edit/${board.data.id}`)}
            >
              수정
            </Button>
          </Col>
        )}
      </Row>
      <Row>
        <Col md={24} xs={24} sm={24} lg={24}>
          <List
            className="comment-list"
            header={`${board.data.comments.length} replies`}
            itemLayout="horizontal"
            dataSource={board.data.comments}
            renderItem={(comment: IComment) => (
              <Card key={comment.id}>
                <li>
                  <Comment
                    author={`${comment.user.email}(${comment.user.name})`}
                    content={<p>{comment.content}</p>}
                    datetime={comment.createdAt.substring(
                      0,
                      10,
                    )}
                  />
                </li>
              </Card>
            )}
          />
        </Col>
      </Row>

      <Row>
        <CommentForm />
      </Row>
    </AppLayout>
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
      type: LOAD_USER_REQUEST,
    });
    context.store.dispatch({
      type: BOARD_DETAIL_REQUEST,
      data: context.params.id,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  },
);

export default edit;
