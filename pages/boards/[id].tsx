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
import UserStore from "../../stores/userStore";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import wrapper from "../../stores/configureStore";
import { END } from "redux-saga";
import { BOARD_DETAIL_REQUEST } from "../../reducers/board";
import { useSelector } from "react-redux";
import { LOAD_USER_REQUEST } from "../../reducers/user";
import axios from "axios";
import AppLayout from "../../components/AppLayout";

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
const edit = () => {
  const { me } = useSelector((state: any) => state.user);
  const { board } = useSelector((state: any) => state.board);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [comments, setComments] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(board.data.likes.length);

  const init = useCallback(async () => {
    getComment();
  }, []);

  const getComment = useCallback(async () => {
    const result = await api.index(`/comments/${board.data.id}`);
    const { data, status: httpStatus } = result;
    if (httpStatus === 200) {
      setComments(data.data);
    }
  }, [board]);

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    for (let like of board.data.likes) {
      if (like.userId === board.data.id) {
        setIsLiked(true);
        break;
      }
    }
  }, [me]);

  const onSubmit = useCallback(async (e) => {
    const result = await api.create(`/comments/${board.data.id}`, { comment });
    const { data, status:httpStatus } = result;
    if (httpStatus === 200) {
      setComment("");
      setComments(comments.concat(data.data));
    }
  }, [comments, comment]);

  const onClickHelped = useCallback(async () => {
    if (
      !me ||
      !me.data ||
      !me.data.id
    ) {
      message.error("로그인을 먼저 해주세요.");
      return;
    }
    const result = await api.create(`/likes/${board.data.id}`, {});
    const { data, status:httpStatus } = result;
    if (httpStatus === 200) {
      if (data.message === "liked") {
        setIsLiked(true);
        setLikeCount(likeCount + 1);
        message.success("감사합니다.");
      } else if (data.message === "deleted") {
        setIsLiked(false);
        setLikeCount(likeCount - 1);
        message.success("더 도움될 수 있도록 노력하겠습니다.");
      }
    }
  }, [likeCount, board]);

  return (
    <AppLayout>
      <Row>
        <Col md={24} xs={24} sm={24} lg={24}>
          <Card title={board.data.title}>
            {board && ReactHtmlParser(board.data.content)}
          </Card>
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
                  <Badge
                    count={likeCount}
                  />
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
                  <Badge
                    count={likeCount}
                  />
                </span>
              </Button>
            )}
        </Col>
      </Row>
      <Row>
        {me &&
          me.data &&
          me.data.role === 99 && (
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
        {comments && comments.length > 0 && (
          <Col md={24} xs={24} sm={24} lg={24}>
            <List
              className="comment-list"
              header={`${comments.length} replies`}
              itemLayout="horizontal"
              dataSource={comments}
              renderItem={(comment: IComment) => (
                <Card key={comment.id}>
                  <li>
                    <Comment
                      author={`${comment.user.email}(${comment.user.name})`}
                      content={<p>{comment.content}</p>}
                      datetime={comment.createdAt.substring(0, 10)}
                    />
                  </li>
                </Card>
              )}
            />
          </Col>
        )}
      </Row>

      <Row>
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
                loading={submitting}
                onClick={onSubmit}
                type="primary"
                disabled={me.data &&
                  Object.keys(me.data).length > 0
                  ? false
                  : true}
              >
                댓글등록
              </Button>
            </Form.Item>
          </Card>
        </Col>
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
