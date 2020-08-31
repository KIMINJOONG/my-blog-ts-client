import {
  all,
  fork,
  takeEvery,
  call,
  put,
  takeLatest,
} from "redux-saga/effects";

import axios from "axios";
import {
  BOARD_DETAIL_SUCCESS,
  BOARD_DETAIL_FAILURE,
  BOARD_DETAIL_REQUEST,
  LOAD_BOARDS_SUCCESS,
  LOAD_BOARDS_REQUEST,
  LOAD_BOARDS_FAILURE,
  LOAD_COUNT_BY_TODAY_REQUEST,
  LOAD_COUNT_BY_TODAY_SUCCESS,
  LOAD_COUNT_BY_TODAY_FAILURE,
  LOAD_BOARDS_FOR_MAIN_REQUEST,
  LOAD_BOARDS_FOR_MAIN_SUCCESS,
  LOAD_BOARDS_FOR_MAIN_FAILURE,
} from "../reducers/board";

interface IBOARDDETAILPROPS {
  categoryId: string;
  query: string;
}

function boardDetailAPI(boardId: string) {
  // 서버에 요청을 보내는 부분
  return axios.get(`/boards/${boardId}`, {
    withCredentials: true, // 클라이언트에서 요청 보낼 때는 브라우저가 쿠키를 같이 동봉
  }); // 서버사이드렌더링일 때는, 브라우저가 없다.
}

function* boardDetail(action: any) {
  try {
    // yield call(loadUserAPI);
    const result = yield call(boardDetailAPI, action.data);

    yield put({
      // put은 dispatch 동일
      type: BOARD_DETAIL_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    // loginAPI 실패
    yield put({
      type: BOARD_DETAIL_FAILURE,
      error: e,
    });
  }
}

function* watchBoardDetail() {
  yield takeEvery(BOARD_DETAIL_REQUEST, boardDetail);
}

function loadBoardsAPI(data: IBOARDDETAILPROPS) {
  // 서버에 요청을 보내는 부분
  return axios.get(`/boards/category/${data.categoryId}?${data.query}`, {
    withCredentials: true, // 클라이언트에서 요청 보낼 때는 브라우저가 쿠키를 같이 동봉
  }); // 서버사이드렌더링일 때는, 브라우저가 없다.
}

function* loadBoards(action: any) {
  try {
    // yield call(loadUserAPI);
    const result = yield call(loadBoardsAPI, action.data);

    yield put({
      // put은 dispatch 동일
      type: LOAD_BOARDS_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    // loginAPI 실패
    yield put({
      type: LOAD_BOARDS_FAILURE,
      error: e,
    });
  }
}

function* watchLoadBoards() {
  yield takeEvery(LOAD_BOARDS_REQUEST, loadBoards);
}

function loadCountByTodayAPI() {
  // 서버에 요청을 보내는 부분
  return axios.get(`/boards/countByToday`, {
    withCredentials: true, // 클라이언트에서 요청 보낼 때는 브라우저가 쿠키를 같이 동봉
  }); // 서버사이드렌더링일 때는, 브라우저가 없다.
}

function* loadCountByToday() {
  try {
    // yield call(loadUserAPI);
    const result = yield call(loadCountByTodayAPI);

    yield put({
      // put은 dispatch 동일
      type: LOAD_COUNT_BY_TODAY_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    // loginAPI 실패
    yield put({
      type: LOAD_COUNT_BY_TODAY_FAILURE,
      error: e,
    });
  }
}

function loadBoardsForMainAPI() {
  return axios.get("/boards?limit=5");
}

function* loadBoardsForMain() {
  try {
    const result = yield call(loadBoardsForMainAPI);

    yield put({
      // put은 dispatch 동일
      type: LOAD_BOARDS_FOR_MAIN_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    // loginAPI 실패
    yield put({
      type: LOAD_BOARDS_FOR_MAIN_FAILURE,
      error: e,
    });
  }
}

function* watchLoadCountByToday() {
  yield takeEvery(LOAD_COUNT_BY_TODAY_REQUEST, loadCountByToday);
}

function* watchLoadBoardsForMain() {
  yield takeLatest(LOAD_BOARDS_FOR_MAIN_REQUEST, loadBoardsForMain);
}

export default function* userSaga() {
  yield all(
    [
      fork(watchBoardDetail),
      fork(watchLoadBoards),
      fork(watchLoadCountByToday),
      fork(watchLoadBoardsForMain),
    ],
  );
}
