import { all, call } from "redux-saga/effects";
import user from "./user";
import board from "./board";
import axios from "axios";

axios.defaults.baseURL = process.env.NODE_ENV === "production"
  ? "http://54.150.124.198"
  : "http://localhost:4000";

export default function* rootSaga() {
  yield all([call(user), call(board)]);
}
