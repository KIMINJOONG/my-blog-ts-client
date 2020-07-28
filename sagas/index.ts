import { all, call } from "redux-saga/effects";
import user from "./user";
import axios from "axios";

axios.defaults.baseURL =
    process.env.NODE_ENV === "production"
        ? "https://api.kohubi.xyz"
        : "http://localhost:4000";

export default function* rootSaga() {
    yield all([call(user)]);
}
