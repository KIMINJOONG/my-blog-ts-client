import { useEffect, useCallback, useState } from "react";
import api from "../../api";
import { useRouter } from "next/router";
import { Row, Col, Card, Divider } from "antd";

interface IBoard {
  id: number;
  title: string;
  content: string;
}

const hashtag = () => {
  const router = useRouter();
  const { tag } = router.query;

  const [boards, setBoards] = useState([]);

  const init = useCallback(async () => {
    const encodedUriTag = encodeURIComponent(tag as string);
    const result = await api.show(`hashtags/${encodedUriTag}`);
    const { data, status: httpStatus } = result;
    if (httpStatus === 200) {
      setBoards(data.data);
    }
  }, []);
  useEffect(() => {
    init();
  }, []);
  return <div>
    <Row>
      <Col span={24}>
        <Divider
          style={{
            borderBottom: "1px solid black",
          }}
        >
          Latest
        </Divider>
      </Col>
      {boards && boards.map((board: IBoard) => (
        <Col span={24} key={board.id}>
          <Card
            title={board.title}
            bordered={true}
            headStyle={{ textAlign: "center" }}
          >
            {board.content}
          </Card>
        </Col>
      ))}
    </Row>
  </div>;
};

export default hashtag;
