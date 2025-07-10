import {
  all,
  fork,
  put,
  takeEvery,
  takeLatest,
  call,
} from "redux-saga/effects";
import axios from "axios";
import {
  PUT_REPORTDATA_FAILURE,
  PUT_REPORTDATA_SUCCESS,
  PUT_REPORTDATA_REQUEST,
} from "../reducers/report";

//리포트에 데이터 넣기
function reportAPI(data) {
  return axios.post("/report", data, { withCredentials: true });
}

function* report(action) {
  try {
    const result = yield call(reportAPI, action.data);
    yield put({
      type: PUT_REPORTDATA_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PUT_REPORTDATA_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchReport() {
  yield takeLatest(PUT_REPORTDATA_REQUEST, report);
}

export default function* authSaga() {
  yield all([fork(watchReport)]);
}
