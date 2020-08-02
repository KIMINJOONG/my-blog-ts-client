import { Row, Col, Card, Divider } from "antd";
import { NextPage } from "next";
import { useEffect, useCallback, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import api from "../api";
import Chart from "../components/Chart";
import wrapper from "../stores/configureStore";
import axios from "axios";
import { LOAD_USER_REQUEST } from "../reducers/user";
import AppLayout from "../components/AppLayout";
import { END } from "redux-saga";

interface IBoard {
    id: number;
    title: string;
    content: string;
    mainImg: string;
    shortContent: string;
    mainImgStyleValue: any;
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
    }, []);
    useEffect(() => {
        init();
    }, []);
    return (
        <AppLayout>
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
                {boards &&
                    boards.map((board: IBoard) => (
                        <Col
                            span={24}
                            key={board.id}
                            style={{ marginTop: "10px" }}
                        >
                            <Card
                                title={board.title}
                                bordered={true}
                                headStyle={{ textAlign: "center" }}
                                extra={<a href={`boards/${board.id}`}>More</a>}
                            >
                                {ReactHtmlParser(board.mainImg)}
                                <p>{board.shortContent}</p>
                            </Card>
                        </Col>
                    ))}
            </Row>
            <Row>
                {dates.length > 0 && counts.length > 0 && (
                    <Chart
                        dates={dates}
                        countByDate={counts}
                        thisMonth={thisMonth}
                    />
                )}
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
        context.store.dispatch(END);
        await context.store.sagaTask.toPromise();
    }
);

export default Home;
