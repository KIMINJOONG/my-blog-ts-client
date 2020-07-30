import { useRouter } from "next/router";
import Edit from "../../../components/Edit";
import { useState, useEffect, useCallback } from "react";
import api from "../../../api";
import React from "react";
import { useSelector } from "react-redux";
import wrapper from "../../../stores/configureStore";
import { END } from "redux-saga";
import axios from "axios";
import { LOAD_USER_REQUEST } from "../../../reducers/user";
import {
  BOARD_DETAIL_REQUEST,
} from "../../../reducers/board";
import AppLayout from "../../../components/AppLayout";

const edit = (props: any) => {
  const router = useRouter();
  const { board } = useSelector((state: any) => state.board);
  const { id } = router.query;
  const [data, setData] = useState();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const init = useCallback(async () => {
    setData(board.data);
    setLoading(true);
    const categoriesResult = await api.index("/categories");
    const { data: categories, status: categoriesStatus } = categoriesResult;

    if (categoriesStatus === 200) {
      setCategories(categories.data);
    }
    setLoading(false);
  }, [board]);
  useEffect(() => {
    init();
  }, []);

  return (
    <AppLayout>
      {loading
        ? (
          <div>로딩</div>
        )
        : (
          <div>
            <Edit
              param={id}
              data={data}
              categories={categories}
              preset={"none"}
            />
          </div>
        )}
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
      type: BOARD_DETAIL_REQUEST,
      data: context.params.id,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  },
);

export default React.memo(edit);
