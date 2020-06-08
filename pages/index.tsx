import { Row, Col, Card, Divider } from "antd";
import { NextPage } from "next";
import { useEffect, useCallback, useState } from "react";
import api from "../api";

interface IBoard {
  id: number;
  title: string;
  content: string;
  mainImg: string;
  shortContent: string;
}
const Home: NextPage = () => {
  const [boards, setBoards] = useState([]);
  const init = useCallback(async () => {
    const result = await api.index("/boards");

    const { data, status:httpStatus } = result;

    const imgRegexPattern = /<img.*?src="(.*?)"+>/g;
    for (let board of data.data) {
      const imgRegex = imgRegexPattern.exec(board.content);
      if (imgRegex) {
        const mainImg = imgRegex[1];
        board.mainImg = mainImg;
        board.shortContent = board.content.replace(/(<([^>]+)>)/ig, "");
      }
    }

    if (httpStatus === 200) {
      setBoards(data.data);
    }
  }, []);
  useEffect(() => {
    init();
  }, []);
  return (
    <div>
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
              <img src={board.mainImg} style={{ float: "left" }} />
              <p>{board.shortContent}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;
