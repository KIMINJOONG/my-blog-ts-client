import { Table, Col, Input, Typography } from "antd";
import Link from "next/link";
import { useCallback } from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import { useSelector, useDispatch } from "react-redux";
import AppLayout from "../../../components/AppLayout";
import wrapper from "../../../stores/configureStore";
import { END } from "redux-saga";
import axios from "axios";
import { LOAD_USER_REQUEST } from "../../../reducers/user";
import { LOAD_BOARDS_REQUEST } from "../../../reducers/board";
import { RootState } from "../../../reducers";
import { IBoard } from "../../../types/board";
import Head from "next/head";

type Align = "left" | "right" | "center";
const columns = [
  {
    title: "번호",
    dataIndex: "id",
    key: "id",
    width: "20%",
    align: "center" as Align,
    render: (text: string) => (
      <Link href={`/boards/${text}`} prefetch={false}>
        <a>{text}</a>
      </Link>
    )
  },
  {
    title: "제목",
    dataIndex: "title",
    key: "title",
    align: "center" as Align,
    render: (text: string, record: IBoard) => (
      <Link href={`/boards/${record.id}`} prefetch={false}>
        <a>
          {text}&nbsp;
          <Typography.Text disabled>[{record.comments.length}]</Typography.Text>
        </a>
      </Link>
    )
  },
  {
    title: "조회",
    dataIndex: "view",
    key: "view",
    align: "center" as Align,
    render: (text: string, record: IBoard) => (
      <Link href={`/boards/${record.id}`} prefetch={false}>
        <a>{text}</a>
      </Link>
    )
  },
  {
    title: "날짜",
    dataIndex: "createdAt",
    key: "createdAt",
    width: "20%",
    align: "center" as Align,
    render: (text: string, record: IBoard) => (
      <Link href={`/boards/${record.id}`} prefetch={false}>
        <a>{text.substring(0, 10)}</a>
      </Link>
    )
  }
];

const boards = () => {
  const { me } = useSelector((state: RootState) => state.user);
  const { boards } = useSelector((state: RootState) => state.board);

  const router = useRouter();
  const { id } = router.query;

  const onSearch = useCallback(
    (value: string = "", e) => {
      let searchArray = [];
      searchArray.push(`title=${value}`);

      Router.push({
        pathname: `/boards/category/${id}`,
        query: { title: encodeURIComponent(value), page: 1, limit: 10 }
      });
    },
    [router]
  );

  const onChangePage = useCallback((page, pageSize) => {
    const { title } = router.query;

    Router.push({
      pathname: `/boards/category/${id}`,
      query: { page, title, limit: pageSize }
    });
  }, []);

  const onShowSizeChange = useCallback((current, size) => {
    const { title } = router.query;

    Router.push({
      pathname: `/boards/category/${id}`,
      query: { page: current, title, limit: size }
    });
  }, []);
  return (
    <div>
      <Head>
        <meta property="og:title" content="게시글 리스트" key="title" />
        <meta property="og:image" content="https://kohubi.xyz/logo.png" />
        <meta property="og:description" content="Og tag test!!!" />
        <meta property="og:title" content="Og tag test!!! title" />
      </Head>
      {me && me.data && me.data.role === 99 && (
        <Col style={{ textAlign: "right" }}>
          <Link href="/boards/edit" prefetch={false}>
            <a>글쓰기</a>
          </Link>
        </Col>
      )}

      {boards && (
        <Table
          rowKey={record => record.id}
          columns={columns}
          dataSource={boards.data}
          pagination={{
            position: ["bottomCenter"],
            total: boards.totalCount,
            current: router.query.page
              ? parseInt(router.query.page as string, 10)
              : 1,
            onChange: onChangePage,
            onShowSizeChange
          }}
        />
      )}
      <Col>
        <Input.Search
          placeholder="input search text"
          onSearch={onSearch}
          enterButton
        />
      </Col>
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

    const { title, page, limit = 10 } = context.query;

    let searchArray = [];
    if (title) {
      searchArray.push(`title=${title}`);
    }
    if (page) {
      searchArray.push(`page=${page}`);
    }
    if (limit) {
      searchArray.push(`limit=${limit}`);
    }

    context.store.dispatch({
      type: LOAD_USER_REQUEST
    });
    context.store.dispatch({
      type: LOAD_BOARDS_REQUEST,
      data: {
        categoryId: context.params.id,
        query: searchArray.join("&")
      }
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default boards;
