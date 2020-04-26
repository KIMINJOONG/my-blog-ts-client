import { useRouter } from "next/router";
import Edit from "../../../components/Edit";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const edit = () => {
    const router = useRouter();
    const { id } = router.query;
    const [data, setData] = useState(null);

    const init = useCallback(async () => {
        const result = await axios.get(`http://localhost:4000/boards/${id}`);
        const { data, status: httpStatus } = result;
        if (httpStatus === 200) {
            setData(data.data);
        }
    }, []);
    useEffect(() => {
        init();
    }, []);

    return (
        <div style={{ marginTop: "58px" }}>
            <Edit param={id} data={data} />
        </div>
    );
};

export default edit;
