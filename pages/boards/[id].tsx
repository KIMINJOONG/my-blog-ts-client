import { useRouter } from "next/router";
import { useState, useEffect, useCallback, useContext } from "react";
import api from "../../api";
import ReactHtmlParser from "react-html-parser";
import { Button, Card } from "antd";
import Router from "next/router";
import UserStore from "../../stores/userStore";
import Link from "next/link";

interface board {
    content: string;
    createdAt: string;
    id: number;
    title: string;
    updatedAt: string;
    userId: number;
}
const edit = () => {
    const router = useRouter();
    const { id } = router.query;
    const [data, setData] = useState({} as board);
    const userState = useContext(UserStore);

    const init = useCallback(async () => {
        const result = await api.show(`/boards/${id}`);
        const { data, status: httpStatus } = result;
        setData(data.data);
    }, []);
    useEffect(() => {
        init();
    }, []);

    return (
        <div>
            <div>
                <Card title={data.title}>
                    {data && ReactHtmlParser(data.content)}
                </Card>
            </div>
            <div>
                {userState &&
                    userState.value &&
                    userState.value.role &&
                    userState.value.role === 99 && (
                        <Button
                            type="primary"
                            onClick={() => Router.push(`/boards/edit/${id}`)}
                        >
                            수정
                        </Button>
                    )}
            </div>
        </div>
    );
};

export default edit;
