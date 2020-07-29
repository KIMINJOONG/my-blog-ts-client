import { Table, Tag, Col, Input } from "antd";
import Link from "next/link";
import { useEffect, useState, useCallback, useContext } from "react";
import Router, { useRouter } from "next/router";
import api from "../../../api";
import { useSelector } from "react-redux";
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
  const { me } = useSelector((state: any) => state.user);
  const { boards } = useSelector((state: any) => state.board);

  const [totalCount, setTotalCount] = useState(0);
  const router = useRouter();
  const { id } = router.query;

  // const init = useCallback(async () => {
  //   const { title, page, limit = 10 } = router.query;
  //   let result = null;
  //   let searchArray = [];
  //   let endPoint = `/boards/category/${id}`;

  //   if (title) {
  //     searchArray.push(`title=${title}`);
  //   }
  //   if (page) {
  //     searchArray.push(`page=${page}`);
  //   }
  //   if (limit) {
  //     searchArray.push(`limit=${limit}`);
  //   }
  //   endPoint = `${endPoint}?${searchArray.join("&")}`;
  //   result = await api.index(endPoint);
  //   const { data, status: httpStatus } = result;

  //   if (httpStatus === 200) {
  //     setBoards(data.data);
  //     setTotalCount(data.totalCount);
  //   }
  // }, [router]);

  // useEffect(() => {
  //   init();
  // }, [router.query]);

  // const onSearch = useCallback((value: string) => {
  //   if (!value) {
  //     Router.push({
  //       pathname: `/boards/category/${id}`,
  //     });
  //   } else {
  //     Router.push({
  //       pathname: `/boards/category/${id}`,
  //       query: { title: value },
  //     });
  //   }
  // }, []);

  // const onChangePage = useCallback((page, pageSize) => {
  //   const { title } = router.query;
  //   Router.push({
  //     pathname: `/boards/category/${id}`,
  //     query: { page, title, limit: pageSize },
  //   });
  // }, []);

  // const onShowSizeChange = useCallback((current, size) => {
  //   const { title } = router.query;
  //   Router.push({
  //     pathname: `/boards/category/${id}`,
  //     query: { page: current, title, limit: size },
  //   });
  // }, []);
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
              total: totalCount,
              current: router.query.page
                ? parseInt(router.query.page as string, 10)
                : 1,
              // onChange: onChangePage,
              // onShowSizeChange,
            }}
          />
        )}
        <Col>
          <Input.Search
            placeholder="input search text"
            // onSearch={}
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
    context.store.dispatch({
      type: LOAD_USER_REQUEST,
    });
    context.store.dispatch({
      type: LOAD_BOARDS_REQUEST,
      data: context.params.id,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  },
);

export default boards;
