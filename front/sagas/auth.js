import { all, fork, put, takeEvery, takeLatest, call } from "redux-saga/effects";
import axios from "axios";
import {
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  CHANGE_ACCOUNT_FAILURE,
  CHANGE_ACCOUNT_SUCCESS,
  CHANGE_ACCOUNT_REQUEST,
  CHANGE_SECTION_FAILURE,
  CHANGE_SECTION_SUCCESS,
  CHANGE_SECTION_REQUEST,
  REMOVE_ACCOUNT_FAILURE,
  REMOVE_ACCOUNT_REQUEST,
  REMOVE_ACCOUNT_SUCCESS,
  LOAD_MY_INFO_FAILURE,
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOAD_ACCOUNTS_FAILURE,
  LOAD_ACCOUNTS_SUCCESS,
  LOAD_ACCOUNTS_REQUEST,
  CHANGE_PASSWORD_FAILURE,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_THEME_FAILURE,
  CHANGE_THEME_SUCCESS,
  CHANGE_THEME_REQUEST,
} from "../reducers/auth";

//로그인
function logInAPI(data) {
  return axios.post("/user/login", data, { withCredentials: true }); //백엔드 서버 연결
}

//call(logInAPI, action.data);
function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

//로그아웃
function logOutAPI() {
  return axios.post("/user/logout", undefined, { withCredentials: true }); //백엔드 서버 연결
}

function* logOut() {
  try {
    yield call(logOutAPI);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

//회원가입
function signUpAPI(data) {
  return axios.post("/user/register", data, { withCredentials: true }); //백엔드 서버 연결
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    // console.log(result);
    yield put({
      type: SIGN_UP_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}

//계정권한 변경
function changeAccountAPI(data) {
  return axios.patch("/accounts/authority", { authority: data.authority, id: data.id }, { withCredentials: true }); //백엔드 서버 연결
}

function* changeAccount(action) {
  try {
    const result = yield call(changeAccountAPI, action.data);
    yield put({
      type: CHANGE_ACCOUNT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: CHANGE_ACCOUNT_FAILURE,
      error: err.response.data,
    });
  }
}

//대시보드 유형 변경
function changeSectionAPI(data) {
  return axios.patch("/accounts/section", { section: data.section, id: data.id }, { withCredentials: true }); //백엔드 서버 연결
}

function* changeSection(action) {
  try {
    const result = yield call(changeSectionAPI, action.data);
    yield put({
      type: CHANGE_SECTION_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: CHANGE_SECTION_FAILURE,
      error: err.response.data,
    });
  }
}

//계정 삭제
function removeAccountAPI(data) {
  return axios.delete(`/accounts/${data}`, { authority: data.authority, id: data.id }, { withCredentials: true }); //백엔드 서버 연결
}

function* removeAccount(action) {
  try {
    const result = yield call(removeAccountAPI, action.data);
    yield put({
      type: REMOVE_ACCOUNT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: REMOVE_ACCOUNT_FAILURE,
      error: err.response.data,
    });
  }
}

//내계정 정보 가져오기
function loadMyInfoAPI() {
  return axios.get("/user", undefined, { withCredentials: true }); //백엔드 서버 연결
}

function* loadMyInfo() {
  try {
    const result = yield call(loadMyInfoAPI);
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: err.response.data,
    });
  }
}

//모든계정정보 가져오기
function loadAccountsAPI(data) {
  return axios.get("/accounts", data, { withCredentials: true }); //백엔드 서버 연결
}

function* loadAccounts(action) {
  try {
    const result = yield call(loadAccountsAPI, action.data);
    yield put({
      type: LOAD_ACCOUNTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_ACCOUNTS_FAILURE,
      error: err.response.data,
    });
  }
}

//비밀번호 변경
function changePasswordAPI(data) {
  return axios.patch("/accounts/password", { id: data.id, password: data.password }, { withCredentials: true }); //백엔드 서버 연결
}

function* changePassword(action) {
  try {
    const result = yield call(changePasswordAPI, action.data);
    // console.log(result);
    yield put({
      type: CHANGE_PASSWORD_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: CHANGE_PASSWORD_FAILURE,
      error: err.response.data,
    });
  }
}

//테마 변경
function changeThemeAPI(data) {
  return axios.patch("/user/theme", { id: data.id, theme: data.theme }, { withCredentials: true }); //백엔드 서버 연결
}

function* changeTheme(action) {
  try {
    const result = yield call(changeThemeAPI, action.data);
    yield put({
      type: CHANGE_THEME_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: CHANGE_THEME_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchLogout() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSigUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function* watchChangeAccount() {
  yield takeLatest(CHANGE_ACCOUNT_REQUEST, changeAccount);
}

function* watchChangeSection() {
  yield takeLatest(CHANGE_SECTION_REQUEST, changeSection);
}

function* watchRemoveAccount() {
  yield takeLatest(REMOVE_ACCOUNT_REQUEST, removeAccount);
}

function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

function* watchloadAccounts() {
  yield takeLatest(LOAD_ACCOUNTS_REQUEST, loadAccounts);
}

function* watchChangePassword() {
  yield takeLatest(CHANGE_PASSWORD_REQUEST, changePassword);
}

function* watchChangeTheme() {
  yield takeLatest(CHANGE_THEME_REQUEST, changeTheme);
}

export default function* authSaga() {
  yield all([
    fork(watchLogin),
    fork(watchLogout),
    fork(watchSigUp),
    fork(watchChangeAccount),
    fork(watchChangeSection),
    fork(watchRemoveAccount),
    fork(watchLoadMyInfo),
    fork(watchloadAccounts),
    fork(watchChangePassword),
    fork(watchChangeTheme),
  ]);
}
