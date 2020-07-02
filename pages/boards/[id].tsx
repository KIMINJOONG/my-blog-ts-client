import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
import api from "../../api";
import ReactHtmlParser from "react-html-parser";
import { Button } from "antd";
import Router from "next/router";

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

  return (
    <div>
      <div>
        {data && ReactHtmlParser(data.content)}
      </div>
      <div>
        <Button
          type="primary"
          onClick={() => Router.push(`/boards/edit/${id}`)}
        >
          수정
        </Button>
      </div>
    </div>
  );
};

export default edit;
