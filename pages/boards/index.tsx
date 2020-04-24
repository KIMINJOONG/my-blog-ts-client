import { Table, Tag, Col } from "antd";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const columns = [
    {
        title: "게시글 번호",
        dataIndex: "_id",
        key: "_id",
        render: (text: String) => <a>{text}</a>,
    },
    {
        title: "제목",
        dataIndex: "title",
        key: "title",
    },
    {
        title: "요약내용",
        dataIndex: "content",
        key: "content",
    },
];

const data = [
    {
        key: "1",
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
        tags: ["nice", "developer"],
    },
    {
        key: "2",
        name: "Jim Green",
        age: 42,
        address: "London No. 1 Lake Park",
        tags: ["loser"],
    },
    {
        key: "3",
        name: "Joe Black",
        age: 32,
        address: "Sidney No. 1 Lake Park",
        tags: ["cool", "teacher"],
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
