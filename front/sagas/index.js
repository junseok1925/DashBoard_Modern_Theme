import { all, fork } from "redux-saga/effects";
import axios from "axios";

import authSaga from "./auth";
import reportSaga from "./report";
import logSaga from "./log";
import scannerSaga from "./scanner";
import ardataSaga from "./ardata";

//axios.defaults.baseURL = "http://localhost:4000"; //포항 서버 환경에서 실행 할 때
axios.defaults.baseURL = "http://localhost:4000"; //local 환경에서 실행 할 때

//axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([fork(authSaga), fork(reportSaga), fork(logSaga), fork(scannerSaga), fork(ardataSaga)]);
}
