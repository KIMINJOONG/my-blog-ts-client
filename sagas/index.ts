import { all, call } from "redux-saga/effects";
import user from "./user";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000/api";

export default function* rootSaga() {
    yield all([call(user)]);
}
