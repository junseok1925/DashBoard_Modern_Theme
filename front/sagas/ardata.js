import { all, fork, put, takeLatest, call } from "redux-saga/effects";
import axios from "axios";
import {
  LOAD_ARDATA_FAILURE,
  LOAD_ARDATA_REQUEST,
  LOAD_ARDATA_SUCCESS,
} from "../reducers/ardata";


//모든로그정보 가져오기
function loadArdatasAPI(data) {
  return axios.post("/ardata", data, { withCredentials: true }); //백엔드 서버 연결
}

function* loadArdatas(action) {
  try {
    const result = yield call(loadArdatasAPI, action.data);
    yield put({
      type: LOAD_ARDATA_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_ARDATA_FAILURE,
      error: err.response.data,
    });
  }
}



function* watchArdatas() {
  yield takeLatest(LOAD_ARDATA_REQUEST, loadArdatas);
}

export default function* logSaga() {
  yield all([fork(watchArdatas)]);
}
