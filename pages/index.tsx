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
  CategoryNameLabel,
} from "../components/AppLayout/style";
import Link from "next/link";
import {
  LOAD_COUNT_BY_TODAY_REQUEST,
  LOAD_BOARDS_FOR_MAIN_REQUEST,
} from "../reducers/board";
import ReactHtmlParser from "react-html-parser";
import { useSelector } from "react-redux";
import Helmet from "react-helmet";

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
  const { countByToday, boardsForMain } = useSelector(
    (state: any) => state.board,
  );
  const [dates, setDates] = useState([]);
  const [counts, setCounts] = useState([]);
  const [thisMonth, setThisMonth] = useState("");
  const init = useCallback(async () => {
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

    let countByCategory: any = {};
    if (countByToday && countByToday.data) {
      for (let countByTodayData of countByToday.data) {
        if (countByCategory[countByTodayData.categoryId]) {
          countByCategory[countByTodayData.categoryId].push(
            countByTodayData,
          );
        } else {
          countByCategory[countByTodayData.categoryId] = [
            countByTodayData,
          ];
        }
      }
    }
  }, [countByToday]);
  useEffect(() => {
    init();
  }, []);

  const getCreatedAt = (createdAt: string) => {
    let createdAtSplit = [];
    let createdat = "";
    let createdAtSubstring = createdAt.substring(0, 10);
    createdAtSplit = createdAtSubstring.split("-");

    createdat = createdAtSplit.join(".");
    return createdat;
  };
  return (
    <AppLayout>
      <Helmet>
        {/* Open Graph */}
        <meta property="og:url" content="https://kohubi.xyz" />
        <meta property="og:title" content="코후비 블로그" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="http://www.bbsetheme.com/wp-content/uploads/2017/11/bbsetheme_logo.png"
        />
        <meta property="og:description" content="코후비 블로그" />
      </Helmet>
      <Row>
        <Col xs={0} md={24}>
          <h2>LATEST</h2>
        </Col>
        <Col xs={24} md={0} style={{ textAlign: "center" }}>
          <h2>LATEST</h2>
        </Col>
        <Col xs={24} style={{ marginTop: "15px" }}>
          <Row justify="space-around">
            {boardsForMain.length > 0 &&
              boardsForMain.map((board: IBoard) => (
                <Col
                  key={board.id}
                  xs={24}
                  md={7}
                  style={{
                    boxShadow: "1px 2px 4px 0 rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#ffffff",
                    padding: "10px 20px",
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
                        <CategoryNameLabel>
                          {board.category.name}
                        </CategoryNameLabel>
                      </div>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "19px" }}>
                    <Col xs={24}>
                      <h3>{board.title}</h3>
                    </Col>
                  </Row>
                  <Row>
                    <Col
                      xs={24}
                      style={{ textAlign: "left" }}
                    >
                      <BoardDate>
                        {getCreatedAt(board.createdAt)}
                      </BoardDate>
                    </Col>
                  </Row>
                  <Row
                    style={{
                      marginTop: "32px",
                      height: "54px",
                    }}
                  >
                    <Col xs={24}>
                      <BoardContentSumary>
                        {ReactHtmlParser(
                          board.shortContent,
                        )}
                      </BoardContentSumary>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "53px" }}>
                    <Col
                      xs={24}
                      style={{ textAlign: "right" }}
                    >
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
                  labels={dates}
                  datas={counts}
                  thisMonth={thisMonth}
                  isBar={false}
                />
              )}
            </Col>
            <Col xs={24} md={12}>
              <Chart
                labels={["개발", "취미", "TIL"]}
                datas={[1, 2, 3]}
                thisMonth={thisMonth}
                isBar={true}
              />
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
      type: LOAD_BOARDS_FOR_MAIN_REQUEST,
    });

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  },
);

export default Home;
