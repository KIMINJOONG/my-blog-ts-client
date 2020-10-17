import { Row, Col, Card, Divider } from "antd";
import ReactHtmlParser from "react-html-parser";
import AppLayout from "../../components/AppLayout";
import axios from "axios";
import wrapper from "../../stores/configureStore";
import { LOAD_USER_REQUEST } from "../../reducers/user";
import { END } from "redux-saga";
import {
  LOAD_HASHTAG_BOARDS_REQUEST,
} from "../../reducers/board";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";

interface IBoard {
  id: number;
  title: string;
  content: string;
  mainImg: string;
  shortContent: string;
}

const hashtag = () => {
  const { hashtagBoards } = useSelector((state: RootState) => state.board);

  return (
    <AppLayout>
      <Row>
        <Col span={24}>
          <Divider
            style={{
              borderBottom: "1px solid black",
            }}
          >
            Latest
          </Divider>
        </Col>
        {hashtagBoards && hashtagBoards.map((board: IBoard) => (
          <Col span={24} key={board.id}>
            <Card
              title={board.title}
              bordered={true}
              headStyle={{ textAlign: "center" }}
              extra={<a href={`/boards/${board.id}`}>More</a>}
            >
              {ReactHtmlParser(board.mainImg)}
              <p>{board.shortContent}</p>
            </Card>
          </Col>
        ))}
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

    const { tag } = context.query;
    const encodedUriTag = encodeURIComponent(tag as string);

    context.store.dispatch({
      type: LOAD_HASHTAG_BOARDS_REQUEST,
      hashtag: encodedUriTag,
    });
    context.store.dispatch({
      type: LOAD_USER_REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  },
);

export default hashtag;
