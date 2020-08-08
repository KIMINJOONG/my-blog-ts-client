import { Row, Col, Card, Divider } from "antd";
import { NextPage } from "next";
import { useEffect, useCallback, useState } from "react";
import api from "../api";
import Chart from "../components/Chart";
import wrapper from "../stores/configureStore";
import axios from "axios";
import { LOAD_USER_REQUEST } from "../reducers/user";
import AppLayout from "../components/AppLayout";
import { END } from "redux-saga";
import {
  BoardContentSumary,
  BoardDate,
  MoreA,
} from "../components/AppLayout/style";
import Link from "next/link";
import { LOAD_COUNT_BY_TODAY_REQUEST } from "../reducers/board";

interface ICategory {
  id: string;
  code: number;
  name: string;
  createdAt: string;
}
interface IBoard {
  id: number;
  title: string;
  content: string;
  mainImg: string;
  shortContent: string;
  mainImgStyleValue: any;
  createdAt: string;
  category: ICategory;
}
const Home: NextPage = () => {
  const [boards, setBoards] = useState([]);
  const [dates, setDates] = useState([]);
  const [counts, setCounts] = useState([]);
  const [thisMonth, setThisMonth] = useState("");
  const init = useCallback(async () => {
    const result = await api.index("/boards?limit=5");

    const { data, status: httpStatus } = result;

    const imgRegexPattern = /<img.*?src="(.*?)"+>/g;
    const styleRegexPattern = /style\s*=\s*"([^"]*)/g;
    for (let board of data.data) {
      const imgRegex = imgRegexPattern.exec(board.content);

      if (imgRegex) {
        const mainImg = imgRegex[0];
        const imgStyleRegex = styleRegexPattern.exec(mainImg);
        if (imgStyleRegex) {
          const styleValue = imgStyleRegex[1];
          board.mainImgStyleValue = styleValue;
        }

        board.mainImg = mainImg;
        board.shortContent = board.content.replace(/(<([^>]+)>)/gi, "");
      }
    }

    if (httpStatus === 200) {
      setBoards(data.data);
    }

    const getCountByDate = await api.index("/boards/countByDate");

    const {
      data: countByDateResult,
      status: countByDateResultHtppStatus,
    } = getCountByDate;
    if (countByDateResultHtppStatus === 200) {
      let now = new Date();

      let lastDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      let lastDay: number = lastDate.getDate();
      let dateList = [];
      let countList = [];
      let monthDates: any = {};

      for (let i = 1; i <= lastDay; i++) {
        let day = i < 10 ? `0${i}` : i.toString();
        let month = lastDate.getMonth() + 1 < 10
          ? `0${lastDate.getMonth() + 1}`
          : lastDate.getMonth() + 1;
        let fullDate = `${lastDate.getFullYear()}-${month}-${day}`;
        monthDates[fullDate] = 0;
        dateList.push(day);
      }

      for (let countByDate of countByDateResult.data) {
        monthDates[countByDate.date] = countByDate.count;
      }

      for (let key of Object.keys(monthDates)) {
        countList.push(monthDates[key] as number);
      }

      setDates(dateList as []);
      setCounts(countList as []);

      let thisYearAndMonth = `${lastDate.getFullYear()}-${
        lastDate.getMonth() + 1 < 10
          ? `0${lastDate.getMonth() + 1}`
          : lastDate.getMonth() + 1
      }`;
      setThisMonth(thisYearAndMonth);
    }
  }, []);
  useEffect(() => {
    init();
  }, []);
  return (
    <AppLayout>
      <Row>
        <Col xs={0} md={24}>
          <h2>LATEST</h2>
        </Col>
        <Col xs={24} md={0} style={{ textAlign: "center" }}>
          <h2>LATEST</h2>
        </Col>
        <Col xs={24} style={{ marginTop: "15px" }}>
          <Row justify="space-around">
            {boards &&
              boards.map((board: IBoard) => (
                <Col
                  key={board.id}
                  xs={24}
                  md={7}
                  style={{
                    boxShadow: "1px 2px 4px 0 rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#ffffff",
                    padding: "0px 20px",
                    marginTop: "24px",
                  }}
                >
                  <Row>
                    <Col span={24}>
                      <div
                        style={{
                          width: "47px",
                          height: "24px",
                          display: "inline-block",
                          borderRadius: "16px",
                          backgroundColor: "#03e0c5",
                          textAlign: "center",
                        }}
                      >
                        {board.category.name}
                      </div>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "19px" }}>
                    <Col xs={24}>
                      <h3>{board.title}</h3>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={24} style={{ textAlign: "left" }}>
                      <BoardDate>{board.createdAt.substring(0, 10)}</BoardDate>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "32px", height: "54px" }}>
                    <Col xs={24}>
                      <BoardContentSumary>
                        {board.shortContent}
                      </BoardContentSumary>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "53px" }}>
                    <Col xs={24} style={{ textAlign: "right" }}>
                      <Link href={`boards/${board.id}`}>
                        <MoreA>+more</MoreA>
                      </Link>
                    </Col>
                  </Row>
                </Col>
              ))}
          </Row>
          <Row style={{ marginTop: "100px" }}>
            <Col xs={24} md={12}>
              {dates.length > 0 && counts.length > 0 && (
                <Chart
                  dates={dates}
                  countByDate={counts}
                  thisMonth={thisMonth}
                />
              )}
            </Col>
            <Col xs={24} md={12}>
            </Col>
          </Row>
        </Col>
      </Row>
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context: any) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Authorization = "";
    axios.defaults.withCredentials = true;
    if (context.req && cookie) {
      axios.defaults.headers.Authorization = cookie;
    }
    context.store.dispatch({
      type: LOAD_USER_REQUEST,
    });

    context.store.dispatch({
      type: LOAD_COUNT_BY_TODAY_REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  },
);

export default Home;
