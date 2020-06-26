import { useRouter } from "next/router";
import Edit from "../../components/Edit";
import { useState, useEffect, useCallback } from "react";
import api from "../../api";
import ReactHtmlParser from "react-html-parser";

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

    const init = useCallback(async () => {
        const result = await api.show(`/boards/${id}`);
        const { data, status: httpStatus } = result;
        setData(data.data);
    }, []);
    useEffect(() => {
        init();
    }, []);

    return <div>{data && ReactHtmlParser(data.content)}</div>;
};

export default edit;
