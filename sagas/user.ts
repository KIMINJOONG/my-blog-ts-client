import { all, fork, takeEvery, call, put } from "redux-saga/effects";
import {
    LOAD_USER_SUCCESS,
    LOAD_USER_FAILURE,
    LOAD_USER_REQUEST,
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
        // yield call(loadUserAPI);
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
            error: e,
        });
    }
}

function* watchLoadUser() {
    yield takeEvery(LOAD_USER_REQUEST, loadUser);
}

export default function* userSaga() {
    yield all([fork(watchLoadUser)]);
}
