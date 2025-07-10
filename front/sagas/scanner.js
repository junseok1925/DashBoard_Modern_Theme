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
  LOAD_SCANNERLISTS_FAILURE,
  LOAD_SCANNERLISTS_REQUEST,
  LOAD_SCANNERLISTS_SUCCESS,
  LOAD_ZONELISTS_FAILURE,
  LOAD_ZONELISTS_REQUEST,
  LOAD_ZONELISTS_SUCCESS,
  LOAD_SCANNERLISTS_STONE_FAILURE,
  LOAD_SCANNERLISTS_STONE_REQUEST,
  LOAD_SCANNERLISTS_STONE_SUCCESS,
  LOAD_ZONELISTS_STONE_FAILURE,
  LOAD_ZONELISTS_STONE_REQUEST,
  LOAD_ZONELISTS_STONE_SUCCESS,
} from "../reducers/scanner";

//모든스캐너정보 가져오기
function loadScannerlistsAPI(data) {
  return axios.get("/scanner/scanner", data, { withCredentials: true }); //백엔드 서버 연결
}

function* loadScannerlists(action) {
  try {
    const result = yield call(loadScannerlistsAPI, action.data);
    yield put({
      type: LOAD_SCANNERLISTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_SCANNERLISTS_FAILURE,
      error: err.response.data,
    });
  }
}

//모든Zone정보 가져오기
function loadZonelistsAPI(data) {
  return axios.get("/scanner/zone", data, { withCredentials: true }); //백엔드 서버 연결
}

function* loadZonelists(action) {
  try {
    const result = yield call(loadZonelistsAPI, action.data);
    yield put({
      type: LOAD_ZONELISTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_ZONELISTS_FAILURE,
      error: err.response.data,
    });
  }
}

//모든사적과스캐너정보 가져오기
function loadScannerlistsStoneAPI(data) {
  return axios.get("/scanner/scannerstone", data, { withCredentials: true }); //백엔드 서버 연결
}

function* loadScannerlistsStone(action) {
  try {
    const result = yield call(loadScannerlistsStoneAPI, action.data);
    yield put({
      type: LOAD_SCANNERLISTS_STONE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_SCANNERLISTS_STONE_FAILURE,
      error: err.response.data,
    });
  }
}

//모든사적과Zone정보 가져오기
function loadZonelistsStoneAPI(data) {
  return axios.get("/scanner/zonestone", data, { withCredentials: true }); //백엔드 서버 연결
}

function* loadZonelistsStone(action) {
  try {
    const result = yield call(loadZonelistsStoneAPI, action.data);
    yield put({
      type: LOAD_ZONELISTS_STONE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_ZONELISTS_STONE_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchScanner() {
  yield takeLatest(LOAD_SCANNERLISTS_REQUEST, loadScannerlists);
}

function* watchZone() {
  yield takeLatest(LOAD_ZONELISTS_REQUEST, loadZonelists);
}

function* watchScannerStone() {
  yield takeLatest(LOAD_SCANNERLISTS_STONE_REQUEST, loadScannerlistsStone);
}

function* watchZoneStone() {
  yield takeLatest(LOAD_ZONELISTS_STONE_REQUEST, loadZonelistsStone);
}

export default function* logSaga() {
  yield all([
    fork(watchScanner),
    fork(watchZone),
    fork(watchScannerStone),
    fork(watchZoneStone),
  ]);
}
