import { useRouter } from "next/router";
import { useState, useEffect, useCallback, useContext } from "react";
import api from "../../api";
import ReactHtmlParser from "react-html-parser";
import { Button, Card, Input, Form, List, Comment } from "antd";
import Router from "next/router";
import UserStore from "../../stores/userStore";
import Link from "next/link";

interface IBoard {
  content: string;
  createdAt: string;
  id: number;
  title: string;
  updatedAt: string;
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

const edit = () => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState({} as IBoard);
  const userState = useContext(UserStore);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [comments, setComments] = useState([]);

  const init = useCallback(async () => {
    const result = await api.show(`/boards/${id}`);
    const { data, status: httpStatus } = result;
    if (httpStatus === 200) {
      setData(data.data);
    }
    getComment();
  }, []);

  const getComment = useCallback(async () => {
    const result = await api.index(`/comments/${id}`);
    const { data, status: httpStatus } = result;
    if (httpStatus === 200) {
      setComments(data.data);
    }
  }, []);

  useEffect(() => {
    init();
  }, []);

  const onSubmit = useCallback(async (e) => {
    const result = await api.create(`/comments/${id}`, { comment });
    const { data, status:httpStatus } = result;
    if (httpStatus === 200) {
      setComment("");
      setComments(comments.concat(data.data));
    }
  }, [comments, comment]);

  return (
    <div>
      <div>
        <Card title={data.title}>
          {data && ReactHtmlParser(data.content)}
        </Card>
      </div>
      <div>
        {userState &&
          userState.value &&
          userState.value.role &&
          userState.value.role === 99 && (
            <Button
              type="primary"
              onClick={() => Router.push(`/boards/edit/${id}`)}
            >
              수정
            </Button>
          )}
      </div>
      <div>
        {comments && comments.length > 0 && (
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
        )}
      </div>
      <div>
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
              disabled={Object.keys(userState.value).length > 0 ? false : true}
            >
              댓글등록
            </Button>
          </Form.Item>
        </Card>
      </div>
    </div>
  );
};

export default edit;
