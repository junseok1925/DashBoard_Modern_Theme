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
  PUT_LOG_FAILURE,
  PUT_LOG_SUCCESS,
  PUT_LOG_REQUEST,
  LOAD_LOGLISTS_FAILURE,
  LOAD_LOGLISTS_REQUEST,
  LOAD_LOGLISTS_SUCCESS,
} from "../reducers/log";

//로그인 로그기록 남기기
function logAPI(data) {
  return axios.post("/log", data);
}

function* log(action) {
  try {
    const result = yield call(logAPI, action.data);
    yield put({
      type: PUT_LOG_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PUT_LOG_FAILURE,
      error: err.response.data,
    });
  }
}

//모든로그정보 가져오기
function loadLoglistsAPI(data) {
  return axios.post("/log/loglists", data, { withCredentials: true }); //백엔드 서버 연결
}

function* loadLoglists(action) {
  try {
    const result = yield call(loadLoglistsAPI, action.data);
    yield put({
      type: LOAD_LOGLISTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_LOGLISTS_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLog() {
  yield takeLatest(PUT_LOG_REQUEST, log);
}

function* watchLogLists() {
  yield takeLatest(LOAD_LOGLISTS_REQUEST, loadLoglists);
}

export default function* logSaga() {
  yield all([fork(watchLog), fork(watchLogLists)]);
}
