import { useEffect, useCallback, useState } from "react";
import api from "../../api";
import { useRouter } from "next/router";
import { Row, Col, Card, Divider } from "antd";
import ReactHtmlParser from "react-html-parser";

interface IBoard {
  id: number;
  title: string;
  content: string;
  mainImg: string;
  shortContent: string;
}

const hashtag = () => {
  const router = useRouter();
  const { tag } = router.query;

  const [boards, setBoards] = useState([]);

  const init = useCallback(async () => {
    const encodedUriTag = encodeURIComponent(tag as string);
    const result = await api.show(`hashtags/${encodedUriTag}`);
    const { data, status: httpStatus } = result;

    const imgRegexPattern = /<img.*?src="(.*?)"+>/g;
    for (let board of data.data) {
      const imgRegex = imgRegexPattern.exec(board.content);
      if (imgRegex) {
        const mainImg = imgRegex[0];
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
            extra={<a href={`/boards/${board.id}`}>More</a>}
          >
            {ReactHtmlParser(board.mainImg)}
            <p>{board.shortContent}</p>
          </Card>
        </Col>
      ))}
    </Row>
  </div>;
};

export default hashtag;
