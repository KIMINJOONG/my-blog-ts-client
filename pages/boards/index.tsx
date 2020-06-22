import { Table, Tag, Col, Input } from "antd";
import Link from "next/link";
import { useEffect, useState, useCallback, useContext } from "react";
import axios from "axios";
import Router, { useRouter } from "next/router";
import api from "../../api";
import UserStore from "../../stores/userStore";

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
  const [boards, setBoards] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const router = useRouter();
  const userState = useContext(UserStore);

  const init = useCallback(async () => {
    const { title, page, limit = 10 } = router.query;
    let result = null;
    let searchArray = [];
    let endPoint = "/boards";

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
      query: { page, title },
    });
  }, []);
  return (
    <div>
      {userState &&
        userState.value.role &&
        userState.value.role === 1 && <Col>관리자</Col>}
      <Col style={{ textAlign: "right" }}>
        <Link href="/boards/edit">
          <a>글쓰기</a>
        </Link>
      </Col>
      {boards && (
        <Table
          rowKey={(record) => record.id}
          columns={columns}
          dataSource={boards}
          pagination={{
            position: ["bottomCenter"],
            total: totalCount,
            onChange: onChangePage,
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
export default boards;
