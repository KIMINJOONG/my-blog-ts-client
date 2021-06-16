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
  CategoryNameLabel
} from "../components/AppLayout/style";
import Link from "next/link";
import {
  LOAD_COUNT_BY_TODAY_REQUEST,
  LOAD_BOARDS_FOR_MAIN_REQUEST
} from "../reducers/board";
import ReactHtmlParser from "react-html-parser";
import { useSelector } from "react-redux";
import { IBoard } from "../types/board";

const Home: NextPage = () => {
  const { countByToday, boardsForMain } = useSelector(
    (state: any) => state.board
  );
  const [dates, setDates] = useState([]);
  const [counts, setCounts] = useState([]);
  const [thisMonth, setThisMonth] = useState("");
  const init = useCallback(async () => {
    const getCountByDate = await api.index("/boards/countByDate");

    const {
      data: countByDateResult,
      status: countByDateResultHtppStatus
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
        let month =
          lastDate.getMonth() + 1 < 10
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
          countByCategory[countByTodayData.categoryId].push(countByTodayData);
        } else {
          countByCategory[countByTodayData.categoryId] = [countByTodayData];
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
  return <div>테스트</div>;
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
      type: LOAD_USER_REQUEST
    });

    context.store.dispatch({
      type: LOAD_BOARDS_FOR_MAIN_REQUEST
    });

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default Home;
