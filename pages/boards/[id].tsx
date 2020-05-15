import { useRouter } from "next/router";
import Edit from "../../components/Edit";
import { useState, useEffect, useCallback } from "react";
import api from "../../api";

const edit = () => {
    const router = useRouter();
    const { id } = router.query;
    const [data, setData] = useState(null);

    const init = useCallback(async () => {
        const result = await api.show(`/boards/${id}`);
        const { data, status: httpStatus } = result;
        setData(data.data);
    }, []);
    useEffect(() => {
        init();
    }, []);

    return (
        <div style={{ marginTop: "58px" }}>
            <Edit param={id} data={data} preset={"inline"} disabled={true} />
        </div>
    );
};

export default edit;
