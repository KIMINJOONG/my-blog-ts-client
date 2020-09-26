import {
  all,
  fork,
  takeEvery,
  call,
  put,
  takeLatest,
} from "redux-saga/effects";
import {
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  LOAD_USER_REQUEST,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILURE,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  ILOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  JOIN_USER_REQUEST,
  JOIN_USER_SUCCESS,
  JOIN_USER_FAILURE,
} from "../reducers/user";

import axios from "axios";

function loadUserAPI(userId: string) {
  // 서버에 요청을 보내는 부분
  return axios.get("/users/me", {
    withCredentials: true, // 클라이언트에서 요청 보낼 때는 브라우저가 쿠키를 같이 동봉
  }); // 서버사이드렌더링일 때는, 브라우저가 없다.
}

function* loadUser(action: any) {
  try {
    const result = yield call(loadUserAPI, action.data);

    yield put({
      // put은 dispatch 동일
      type: LOAD_USER_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    // loginAPI 실패
    yield put({
      type: LOAD_USER_FAILURE,
      error: e.response.data,
    });
  }
}

function* watchLoadUser() {
  yield takeEvery(LOAD_USER_REQUEST, loadUser);
}

function logoutUserAPI() {
  // 서버에 요청을 보내는 부분
  return true;
}

function* logoutUser() {
  try {
    // yield call(logoutUserAPI);

    yield put({
      // put은 dispatch 동일
      type: LOGOUT_USER_SUCCESS,
    });
  } catch (e) {
    // loginAPI 실패
    yield put({
      type: LOGOUT_USER_FAILURE,
      error: e,
    });
  }
}

function logInAPI(data: any) {
  return axios.post("/users/login", data, {
    withCredentials: true,
  });
}

function* logIn(action: ILOG_IN_REQUEST) {
  try {
    const result = yield call(logInAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: LOG_IN_FAILURE,
      error: e.response.data,
    });
  }
}

function joinUserAPI(data: any) {
  return axios.post("/users", data, {
    withCredentials: true,
  });
}

function* joinUser(action: ILOG_IN_REQUEST) {
  try {
    const result = yield call(joinUserAPI, action.data);
    yield put({
      type: JOIN_USER_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: JOIN_USER_FAILURE,
      error: e.response.data,
    });
  }
}

function* watchLogoutUser() {
  yield takeLatest(LOGOUT_USER_REQUEST, logoutUser);
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchJoin() {
  yield takeLatest(JOIN_USER_REQUEST, joinUser);
}

export default function* userSaga() {
  yield all(
    [
      fork(watchLoadUser),
      fork(watchLogoutUser),
      fork(watchLogIn),
      fork(watchJoin),
    ],
  );
}
