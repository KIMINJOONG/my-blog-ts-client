import { Table, Tag, Col } from "antd";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const columns = [
    {
        title: "게시글 번호",
        dataIndex: "_id",
        key: "_id",
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
            <Link href={`/boards/${record._id}`}>
                <a>{text}</a>
            </Link>
        ),
    },
    {
        title: "요약내용",
        dataIndex: "content",
        key: "content",
        render: (text: string, record: any) => (
            <Link href={`/boards/${record._id}`}>
                <a>{text}</a>
            </Link>
        ),
    },
];

const boards = () => {
    const [boards, setBoards] = useState([]);

    const init = useCallback(async () => {
        const result = await axios.get("http://localhost:4000/boards");
        const { data, status: httpStatus } = result;

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
            {boards && <Table columns={columns} dataSource={boards} />}
        </div>
    );
};
export default boards;
