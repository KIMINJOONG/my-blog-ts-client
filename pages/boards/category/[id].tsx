import { Table, Col, Input } from "antd";
import Link from "next/link";
import { useState, useCallback } from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import { useSelector, useDispatch } from "react-redux";
import AppLayout from "../../../components/AppLayout";
import wrapper from "../../../stores/configureStore";
import { END } from "redux-saga";
import axios from "axios";
import { LOAD_USER_REQUEST } from "../../../reducers/user";
import { LOAD_BOARDS_REQUEST } from "../../../reducers/board";

type Align = "left" | "right" | "center";
const columns = [
  {
    title: "번호",
    dataIndex: "id",
    key: "id",
    width: "20%",
    align: "center" as Align,
    render: (text: string) => (
      <Link href={`/boards/${text}`}>
        <a>{text}</a>
      </Link>
    ),
  },
  {
    title: "제목",
    dataIndex: "title",
    key: "title",
    align: "center" as Align,
    render: (text: string, record: any) => (
      <Link href={`/boards/${record.id}`}>
        <a>{text}</a>
      </Link>
    ),
  },
  {
    title: "날짜",
    dataIndex: "createdAt",
    key: "createdAt",
    width: "20%",
    align: "center" as Align,
    render: (text: string, record: any) => (
      <Link href={`/boards/${record.id}`}>
        <a>{text.substring(0, 10)}</a>
      </Link>
    ),
  },
];

const boards = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state: any) => state.user);
  const { boards } = useSelector((state: any) => state.board);

  const router = useRouter();
  const { id } = router.query;

  const onSearch = useCallback((value: string = "", e) => {
    let searchArray = [];
    searchArray.push(`title=${value}`);

    Router.push({
      pathname: `/boards/category/${id}`,
      query: { title: value },
    });
    // dispatch({
    //   type: LOAD_BOARDS_REQUEST,
    //   data: {
    //     categoryId: id,
    //     query: searchArray.join("&"),
    //   },
    // });
  }, [router]);

  const onChangePage = useCallback((page, pageSize) => {
    const { title } = router.query;

    Router.push({
      pathname: `/boards/category/${id}`,
      query: { page, title, limit: pageSize },
    });

    // let searchArray = [];

    // if (title) {
    //   searchArray.push(`title=${title}`);
    // }
    // if (page) {
    //   searchArray.push(`page=${page}`);
    // }
    // if (pageSize) {
    //   searchArray.push(`limit=${pageSize}`);
    // }

    // dispatch({
    //   type: LOAD_BOARDS_REQUEST,
    //   data: {
    //     categoryId: id,
    //     query: searchArray.join("&"),
    //   },
    // });
  }, []);

  const onShowSizeChange = useCallback((current, size) => {
    const { title } = router.query;

    Router.push({
      pathname: `/boards/category/${id}`,
      query: { page: current, title, limit: size },
    });
    // let searchArray = [];

    // if (title) {
    //   searchArray.push(`title=${title}`);
    // }
    // if (current) {
    //   searchArray.push(`page=${current}`);
    // }
    // if (size) {
    //   searchArray.push(`limit=${size}`);
    // }

    // dispatch({
    //   type: LOAD_BOARDS_REQUEST,
    //   data: {
    //     categoryId: id,
    //     query: searchArray.join("&"),
    //   },
    // });
  }, []);
  return (
    <AppLayout>
      <div>
        {me &&
          me.data &&
          me.data.role === 99 &&
          <Col style={{ textAlign: "right" }}>
            <Link href="/boards/edit">
              <a>글쓰기</a>
            </Link>
          </Col>}

        {boards && (
          <Table
            rowKey={(record) => record.id}
            columns={columns}
            dataSource={boards.data}
            pagination={{
              position: ["bottomCenter"],
              total: boards.totalCount,
              current: router.query.page
                ? parseInt(router.query.page as string, 10)
                : 1,
              onChange: onChangePage,
              onShowSizeChange,
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
      type: LOAD_USER_REQUEST,
    });
    context.store.dispatch({
      type: LOAD_BOARDS_REQUEST,
      data: {
        categoryId: context.params.id,
        query: searchArray.join("&"),
      },
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  },
);

export default boards;
