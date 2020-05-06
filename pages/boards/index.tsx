import { Table, Tag, Col } from "antd";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const columns = [
    {
        title: "게시글 번호",
        dataIndex: "id",
        key: "id",
        width: "10%",
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
        width: "15%",
        render: (text: string, record: any) => (
            <Link href={`/boards/${record.id}`}>
                <a>{text.substring(0, 10)}</a>
            </Link>
        ),
    },
];

const boards = () => {
    const [boards, setBoards] = useState([]);

    const init = useCallback(async () => {
        const result = await axios.get("http://localhost:4000/boards");
        const { data, status: httpStatus } = result;
        console.log(data.data);

        if (httpStatus === 200) {
            setBoards(data.data);
        }
    }, []);

    useEffect(() => {
        init();
    }, []);
    return (
        <div style={{ marginTop: "58px" }}>
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
        </div>
    );
};
export default boards;
