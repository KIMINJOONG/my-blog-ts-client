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
    ADD_BOARD_SUCCESS,
    ADD_BOARD_FAILURE,
    ADD_BOARD_REQUEST,
    UPDATE_BOARD_REQUEST,
    UPDATE_BOARD_SUCCESS,
    UPDATE_BOARD_FAILURE,
    REMOVE_BOARD_REQUEST,
    REMOVE_BOARD_SUCCESS,
    REMOVE_BOARD_FAILURE,
    LOAD_COMMENTS_SUCCESS,
    LOAD_COMMENTS_FAILURE,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILURE,
    LOAD_COMMENTS_REQUEST,
    ADD_COMMENT_REQUEST,
} from "../reducers/board";
import jsCookie from "js-cookie";

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
            error: e.response.data,
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
            error: e.response.data,
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
            error: e.response.data,
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
            error: e.response.data,
        });
    }
}

function addBoardAPI(data: any) {
    const token = jsCookie.get("token");
    const Authorization = token ? `token=${token}` : "";
    return axios.post("/boards", data, { headers: { Authorization } });
}

function* addBoard(action: any) {
    try {
        const result = yield call(addBoardAPI, action.data);

        yield put({
            // put은 dispatch 동일
            type: ADD_BOARD_SUCCESS,
            data: result.data,
        });
    } catch (e) {
        // loginAPI 실패
        yield put({
            type: ADD_BOARD_FAILURE,
            error: e.response.data,
        });
    }
}

function updateBoardAPI(boardId: string, data: any) {
    const token = jsCookie.get("token");
    const Authorization = token ? `token=${token}` : "";
    return axios.put(`/boards/${boardId}`, data, {
        headers: { Authorization },
    });
}

function* updateBoard(action: any) {
    try {
        const result = yield call(updateBoardAPI, action.boardId, action.data);

        yield put({
            // put은 dispatch 동일
            type: UPDATE_BOARD_SUCCESS,
            data: result.data,
        });
    } catch (e) {
        // loginAPI 실패
        yield put({
            type: UPDATE_BOARD_FAILURE,
            error: e.response.data,
        });
    }
}

function removeBoardAPI(boardId: string | number) {
    const token = jsCookie.get("token");
    const Authorization = token ? `token=${token}` : "";
    return axios.delete(`/boards/${boardId}`, { headers: { Authorization } });
}

function* removeBoard(action: any) {
    try {
        const result = yield call(removeBoardAPI, action.boardId);

        yield put({
            // put은 dispatch 동일
            type: REMOVE_BOARD_SUCCESS,
            data: result.data,
        });
    } catch (e) {
        // loginAPI 실패
        yield put({
            type: REMOVE_BOARD_FAILURE,
            error: e.response.data,
        });
    }
}

function loadCommentsAPI(boardId: string | number) {
    const token = jsCookie.get("token");
    const Authorization = token ? `token=${token}` : "";
    return axios.delete(`/boards/${boardId}`, { headers: { Authorization } });
}

function* loadComments(action: any) {
    try {
        const result = yield call(loadCommentsAPI, action.boardId);

        yield put({
            // put은 dispatch 동일
            type: LOAD_COMMENTS_SUCCESS,
            data: result.data,
        });
    } catch (e) {
        // loginAPI 실패
        yield put({
            type: LOAD_COMMENTS_FAILURE,
            error: e.response.data,
        });
    }
}

function addCommentAPI(boardId: string | number, data: any) {
    const token = jsCookie.get("token");
    const Authorization = token ? `token=${token}` : "";
    return axios.post(
        `/comments/${boardId}`,
        { comment: data },
        {
            headers: { Authorization },
        }
    );
}

function* addComment(action: any) {
    try {
        const result = yield call(addCommentAPI, action.boardId, action.data);
        yield put({
            // put은 dispatch 동일
            type: ADD_COMMENT_SUCCESS,
            data: result.data,
        });
    } catch (e) {
        // loginAPI 실패
        yield put({
            type: ADD_COMMENT_FAILURE,
            error: e.response.data,
        });
    }
}

function* watchLoadCountByToday() {
    yield takeLatest(LOAD_COUNT_BY_TODAY_REQUEST, loadCountByToday);
}

function* watchLoadBoardsForMain() {
    yield takeLatest(LOAD_BOARDS_FOR_MAIN_REQUEST, loadBoardsForMain);
}

function* watchAddBoard() {
    yield takeLatest(ADD_BOARD_REQUEST, addBoard);
}

function* watchUpdateBoard() {
    yield takeLatest(UPDATE_BOARD_REQUEST, updateBoard);
}

function* watchRemoveBoard() {
    yield takeLatest(REMOVE_BOARD_REQUEST, removeBoard);
}

function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function* watchLoadComments() {
    yield takeLatest(LOAD_COMMENTS_REQUEST, loadComments);
}

export default function* userSaga() {
    yield all([
        fork(watchBoardDetail),
        fork(watchLoadBoards),
        fork(watchLoadCountByToday),
        fork(watchLoadBoardsForMain),
        fork(watchAddBoard),
        fork(watchUpdateBoard),
        fork(watchRemoveBoard),
        fork(watchAddComment),
        fork(watchLoadComments),
    ]);
}
