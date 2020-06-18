import { useRouter } from "next/router";
import Edit from "../../../components/Edit";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import api from "../../../api";

const edit = (props: any) => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState(null);

  const init = useCallback(async () => {
    const result = await api.show(`/boards/${id}`);
    const { data, status: httpStatus } = result;
    if (httpStatus === 200) {
      setData(data.data);
    }
  }, []);
  useEffect(() => {
    init();
  }, []);

  return (
    <div>
      <Edit param={id} data={data} preset={"none"} />
    </div>
  );
};

export default edit;
