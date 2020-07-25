import { Table, Tag, Col, Input } from "antd";
import Link from "next/link";
import { useEffect, useState, useCallback, useContext } from "react";
import Router, { useRouter } from "next/router";
import UserStore from "../../../stores/userStore";
import api from "../../../api";
import { AppContext } from "next/app";

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

const boards = ({ boardsData }: any) => {
  const [boards, setBoards] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const router = useRouter();
  const { id } = router.query;
  const userState = useContext(UserStore);

  const init = useCallback(async () => {
    const { title, page, limit = 10 } = router.query;
    let result = null;
    let searchArray = [];
    let endPoint = `/boards/category/${id}`;

    if (title) {
      searchArray.push(`title=${title}`);
    }
    if (page) {
      searchArray.push(`page=${page}`);
    }
    if (limit) {
      searchArray.push(`limit=${limit}`);
    }
    endPoint = `${endPoint}?${searchArray.join("&")}`;
    result = await api.index(endPoint);
    const { data, status: httpStatus } = result;

    if (httpStatus === 200) {
      setBoards(data.data);
      setTotalCount(data.totalCount);
    }
  }, [router]);

  useEffect(() => {
    init();
  }, [router.query]);

  const onSearch = useCallback((value: string) => {
    if (!value) {
      Router.push({
        pathname: "/boards",
      });
    } else {
      Router.push({
        pathname: "/boards",
        query: { title: value },
      });
    }
  }, []);

  const onChangePage = useCallback((page, pageSize) => {
    const { title } = router.query;
    Router.push({
      pathname: "/boards",
      query: { page, title, limit: pageSize },
    });
  }, []);

  const onShowSizeChange = useCallback((current, size) => {
    const { title } = router.query;
    Router.push({
      pathname: "/boards",
      query: { page: current, title, limit: size },
    });
  }, []);
  return (
    <div>
      {userState &&
        userState.value.role &&
        userState.value.role === 99 &&
        <Col style={{ textAlign: "right" }}>
          <Link href="/boards/edit">
            <a>글쓰기</a>
          </Link>
        </Col>}

      {boards && (
        <Table
          rowKey={(record) => record.id}
          columns={columns}
          dataSource={boards}
          pagination={{
            position: ["bottomCenter"],
            total: totalCount,
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
  );
};

boards.getInitialProps = async ({ Component, ctx, router }: AppContext) => {
  const result = await api.index("/boards");
  const { data: boardsData, status: httpStatus } = result;

  if (httpStatus === 200) {
    return { boardsData };
  }
};
export default boards;
