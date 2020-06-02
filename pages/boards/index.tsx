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
  const router = useRouter();
  const userState = useContext(UserStore);

  const init = useCallback(async () => {
    let result = null;
    if (router.query.title) {
      result = await api.index(`/boards?title=${router.query.title}`);
    } else {
      result = await api.index("/boards");
    }
    const { data, status: httpStatus } = result;

    if (httpStatus === 200) {
      setBoards(data.data);
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
          pagination={{ position: ["bottomCenter"] }}
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
