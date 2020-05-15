import { Table, Tag, Col, Input } from "antd";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Router, { useRouter } from "next/router";
import api from "../../api";

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
    const router = useRouter();

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
