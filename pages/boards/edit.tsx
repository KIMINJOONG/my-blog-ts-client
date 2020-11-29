import { useEffect } from "react";
import Edit from "../../components/Edit";
import AppLayout from "../../components/AppLayout";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import { RootState } from "../../reducers";
import {
  loadCategoriesAction,
  LOAD_CATEGORIES_REQUEST
} from "../../reducers/board";
import wrapper from "../../stores/configureStore";
import axios from "axios";
import { END } from "redux-saga";

const edit = () => {
  const { addBoardDone, board } = useSelector(
    (state: RootState) => state.board
  );

  useEffect(() => {
    if (addBoardDone) {
      Router.push(`/boards/${board.data.id}`);
    }
  }, [addBoardDone]);

  return (
    <AppLayout>
      <Edit />x
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
      type: LOAD_CATEGORIES_REQUEST
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default edit;
