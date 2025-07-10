import produce from "../util/produce";

export const initialState = {
  loadAccountsLoading: false,
  loadAccountsDone: false,
  loadAccountsError: null,
  loadMyInfoLoading: false,
  loadMyInfoDone: false,
  loadMyInfoError: null,
  logInLoading: false,
  logInDone: false,
  logInError: null,
  logOutLoading: false,
  logOutDone: false,
  logOutError: null,
  signUpLoading: false,
  signUpDone: false,
  signUpError: null,
  removeAuthLoading: false,
  removeAuthDone: false,
  removeAuthError: null,
  changeAccountsLoading: false,
  changeAccountsDone: false,
  changeAccountsError: null,

  changeSectionLoading: false,
  changeSectionDone: false,
  changeSectionError: null,

  changePasswordLoading: false,
  changePasswordDone: false,
  changePasswordError: null,
  changeThemeLoading: false,
  changeThemeDone: false,
  changeThemeError: null,
  auths: [],
  me: null,
  ago7day: null,
  today: null,
  nowTime: null,
  yesterday: null,
  yesterday2: null,
  lastMonday: null,
  lastSunday: null,
  lastMonthFirst: null,
  lastMonthlast: null,
  monthFirst: null,
  yearFirst: null,
};

export const LOAD_ACCOUNTS_FAILURE = "LOAD_ACCOUNTS_FAILURE";
export const LOAD_ACCOUNTS_SUCCESS = "LOAD_ACCOUNTS_SUCCESS";
export const LOAD_ACCOUNTS_REQUEST = "LOAD_ACCOUNTS_REQUEST";

export const LOAD_MY_INFO_FAILURE = "LOAD_MY_INFO_FAILURE";
export const LOAD_MY_INFO_SUCCESS = "LOAD_MY_INFO_SUCCESS";
export const LOAD_MY_INFO_REQUEST = "LOAD_MY_INFO_REQUEST";

export const LOG_IN_FAILURE = "LOG_IN_FAILURE";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_REQUEST = "LOG_IN_REQUEST";

export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";

export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";

export const REMOVE_ACCOUNT_FAILURE = "REMOVE_ACCOUNT_FAILURE";
export const REMOVE_ACCOUNT_SUCCESS = "REMOVE_ACCOUNT_SUCCESS";
export const REMOVE_ACCOUNT_REQUEST = "REMOVE_ACCOUNT_REQUEST";

export const CHANGE_ACCOUNT_FAILURE = "CHANGE_ACCOUNT_FAILURE";
export const CHANGE_ACCOUNT_SUCCESS = "CHANGE_ACCOUNT_SUCCESS";
export const CHANGE_ACCOUNT_REQUEST = "CHANGE_ACCOUNT_REQUEST";

export const CHANGE_SECTION_FAILURE = "CHANGE_SECTION_FAILURE";
export const CHANGE_SECTION_SUCCESS = "CHANGE_SECTION_SUCCESS";
export const CHANGE_SECTION_REQUEST = "CHANGE_SECTION_REQUEST";

export const CHANGE_PASSWORD_FAILURE = "CHANGE_PASSWORD_FAILURE";
export const CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS";
export const CHANGE_PASSWORD_REQUEST = "CHANGE_PASSWORD_REQUEST";

export const CHANGE_THEME_FAILURE = "CHANGE_THEME_FAILURE";
export const CHANGE_THEME_SUCCESS = "CHANGE_THEME_SUCCESS";
export const CHANGE_THEME_REQUEST = "CHANGE_THEME_REQUEST";

export const loadaccountsRequestAction = (data) => {
  return {
    type: REMOVE_ACCOUNT_SUCCESS,
    data,
  };
};

export const loginRequestAction = (data) => {
  return {
    type: LOG_IN_SUCCESS,
    data,
  };
};

export const logoutRequestAction = () => {
  return {
    type: LOG_OUT_REQUEST,
  };
};

export const registerRequestAction = (data) => {
  return {
    type: SIGN_UP_SUCCESS,
    data,
  };
};

export const removeaccountRequestAction = (data) => {
  return {
    type: REMOVE_ACCOUNT_SUCCESS,
    data,
  };
};

export const changeaccountRequestAction = (data) => {
  return {
    type: CHANGE_ACCOUNT_SUCCESS,
    data,
  };
};

export const changesectionRequestAction = (data) => {
  return {
    type: CHANGE_SECTION_SUCCESS,
    data,
  };
};

export const changepasswordRequestAction = (data) => {
  return {
    type: CHANGE_PASSWORD_SUCCESS,
    data,
  };
};

export const changeThemeRequestAction = (data) => {
  return {
    type: CHANGE_THEME_SUCCESS,
    data,
  };
};

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    const todays = () => {
      // 오늘 날짜
      let today = new Date();
      let year = today.getFullYear();
      let month = today.getMonth() + 1;
      let date = today.getDate();
      if (month < 10) {
        month = "0" + month;
      }
      if (date < 10) {
        date = "0" + date;
      }
      return year + "-" + month + "-" + date;
    };

    const nowTime = () => {
      // 현재 날짜와 시간
      const now = new Date();

      // 년, 월, 일
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
      const date = String(now.getDate()).padStart(2, "0");

      // 시간, 분, 초
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");

      // ISO 형식으로 조합
      return `${year}-${month}-${date}T${hours}:${minutes}:${seconds}.000Z`;
    };

    const yesterdays = () => {
      // 어제날짜
      var yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      let yesterYear = yesterday.getFullYear();
      let yesterMonth = yesterday.getMonth() + 1;
      let yesterDate = yesterday.getDate();
      if (yesterMonth < 10) {
        yesterMonth = "0" + yesterMonth;
      }
      if (yesterDate < 10) {
        yesterDate = "0" + yesterDate;
      }
      return yesterYear + "-" + yesterMonth + "-" + yesterDate;
    };

    const yesterdays2 = () => {
      // 2일 전날짜
      var yesterday2 = new Date();
      yesterday2.setDate(yesterday2.getDate() - 2);
      let yesterYear2 = yesterday2.getFullYear();
      let yesterMonth2 = yesterday2.getMonth() + 1;
      let yesterDate2 = yesterday2.getDate();
      if (yesterMonth2 < 10) {
        yesterMonth2 = "0" + yesterMonth2;
      }
      if (yesterDate2 < 10) {
        yesterDate2 = "0" + yesterDate2;
      }
      return yesterYear2 + "-" + yesterMonth2 + "-" + yesterDate2;
    };

    const ago7days = () => {
      //7일전 날짜
      var yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 7);
      let yesterYear = yesterday.getFullYear();
      let yesterMonth = yesterday.getMonth() + 1;
      let yesterDate = yesterday.getDate();
      if (yesterMonth < 10) {
        yesterMonth = "0" + yesterMonth;
      }
      if (yesterDate < 10) {
        yesterDate = "0" + yesterDate;
      }
      return yesterYear + "-" + yesterMonth + "-" + yesterDate;
    };

    const lastMondays = () => {
      //지난주 월요일
      var lastMonday = new Date();
      let weekday = lastMonday.getDay();
      lastMonday.setDate(lastMonday.getDate() - 7 - weekday + 1);
      let lastMondayYear = lastMonday.getFullYear();
      let lastMondayMonth = lastMonday.getMonth() + 1;
      let lastMondayDate = lastMonday.getDate();
      return lastMondayYear + "-" + lastMondayMonth + "-" + lastMondayDate;
    };

    const lastSundays = () => {
      // 지난주 일요일
      var lastSunday = new Date();
      let weekday = lastSunday.getDay();
      lastSunday.setDate(lastSunday.getDate() - weekday);
      let lastSundayYear = lastSunday.getFullYear();
      let lastSundayMonth = lastSunday.getMonth() + 1;
      let lastSundayDate = lastSunday.getDate();
      return lastSundayYear + "-" + lastSundayMonth + "-" + lastSundayDate;
    };

    const lastMonthFirsts = () => {
      //저번달 1일
      let today = new Date();
      let year = today.getFullYear();
      var lastMonthFirstday = new Date(year, today.getMonth(), 0);
      let lastMonthFirstdayYear = lastMonthFirstday.getFullYear();
      let lastMonthFirstdayMonth = lastMonthFirstday.getMonth() + 1;
      return lastMonthFirstdayYear + "-" + lastMonthFirstdayMonth + "-" + "01";
    };

    const lastMonthlasts = () => {
      //저번달 말일
      let today = new Date();
      let year = today.getFullYear();
      var lastMonthlastday = new Date(year, today.getMonth(), 0);
      let lastMonthlastdayYear = lastMonthlastday.getFullYear();
      let lastMonthlastdayMonth = lastMonthlastday.getMonth() + 1;
      let lastMonthlastdayDate = lastMonthlastday.getDate();
      return lastMonthlastdayYear + "-" + lastMonthlastdayMonth + "-" + lastMonthlastdayDate;
    };

    const monthFirsts = () => {
      //이번딜1일
      var MonthFirstday = new Date();
      let MonthFirstdayYear = MonthFirstday.getFullYear();
      let MonthFirstdayMonth = MonthFirstday.getMonth() + 1;
      return MonthFirstdayYear + "-" + MonthFirstdayMonth + "-" + "01";
    };

    const yearFirsts = () => {
      //올 해 1일
      let year = new Date().getFullYear();
      return year + "-01-01";
    };

    switch (action.type) {
      case LOAD_ACCOUNTS_REQUEST:
        draft.AccountsLoading = true;
        draft.AccountsError = null;
        draft.AccountsDone = false;
        break;
      case LOAD_ACCOUNTS_SUCCESS:
        draft.AccountsLoading = false;
        draft.AccountsDone = true;
        draft.auths = action.data;
        break;
      case LOAD_ACCOUNTS_FAILURE:
        draft.AccountsLoading = false;
        draft.AccountsError = action.error;
        break;

      case LOAD_MY_INFO_REQUEST:
        draft.loadMyInfoLoading = true;
        draft.loadMyInfoError = null;
        draft.loadMyInfoDone = false;
        draft.ago7day = ago7days(); //전역적으로 쓰는 날짜
        draft.today = todays();
        draft.nowTime = nowTime();
        draft.yesterday = yesterdays();
        draft.yesterday2 = yesterdays2();
        draft.lastMonday = lastMondays();
        draft.lastSunday = lastSundays();
        draft.lastMonthFirst = lastMonthFirsts();
        draft.lastMonthlast = lastMonthlasts();
        draft.monthFirst = monthFirsts();
        draft.yearFirst = yearFirsts();
        draft.firstday = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().slice(0, 10);
        break;

      case LOAD_MY_INFO_SUCCESS:
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoDone = true;
        draft.me = action.data;
        break;
      case LOAD_MY_INFO_FAILURE:
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoError = action.error;
        break;

      case LOG_IN_REQUEST:
        draft.logInLoading = true;
        draft.logInError = null;
        break;
      case LOG_IN_SUCCESS:
        draft.logInLoading = false;
        draft.logInDone = true;
        draft.me = action.data;
        break;
      case LOG_IN_FAILURE:
        draft.logInLoading = false;
        draft.logInError = action.error;
        break;

      case LOG_OUT_REQUEST:
        draft.logOutLoading = true;
        draft.logOutDone = false;
        draft.logOutError = null;
        break;
      case LOG_OUT_SUCCESS:
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.me = null;
        break;
      case LOG_OUT_FAILURE:
        draft.logOutLoading = false;
        draft.logOutError = action.error;
        break;

      case SIGN_UP_REQUEST:
        draft.signUpLoading = true;
        draft.signUpDone = false;
        draft.signUpError = null;
        break;
      case SIGN_UP_SUCCESS:
        draft.signUpLoading = false;
        draft.signUpDone = true;
        draft.me = action.data;
        break;
      case SIGN_UP_FAILURE:
        draft.signUpLoading = false;
        draft.signUpError = action.error;
        break;

      case REMOVE_ACCOUNT_REQUEST:
        draft.removeAccountLoading = true;
        draft.removeAccountDone = false;
        draft.removeAccountError = null;
        break;
      case REMOVE_ACCOUNT_SUCCESS:
        draft.removeAccountDone = true;
        draft.removeAccountLoading = false;
        //draft.me = action.data;
        break;
      case REMOVE_ACCOUNT_FAILURE:
        draft.removeAccountLoading = false;
        draft.removeAccountError = action.error;
        break;

      case CHANGE_ACCOUNT_REQUEST:
        draft.changeAccountLoading = true;
        draft.changeAccountDone = false;
        draft.changeAccountError = null;
        break;
      case CHANGE_ACCOUNT_SUCCESS:
        draft.changeAccountDone = true;
        draft.changeAccountLoading = false;
        break;
      case CHANGE_ACCOUNT_FAILURE:
        draft.changeAccountLoading = false;
        draft.changeAccountError = action.error;
        break;

      case CHANGE_SECTION_REQUEST:
        draft.changeSectionLoading = true;
        draft.changeSectionDone = false;
        draft.changeSectionError = null;
        break;
      case CHANGE_SECTION_SUCCESS:
        draft.changeSectionDone = true;
        draft.changeSectionLoading = false;
        break;
      case CHANGE_SECTION_FAILURE:
        draft.changeSectionLoading = false;
        draft.changeSectionError = action.error;
        break;

      case CHANGE_PASSWORD_REQUEST:
        draft.changePasswordLoading = true;
        draft.changePasswordDone = false;
        draft.changePasswordError = null;
        break;
      case CHANGE_PASSWORD_SUCCESS:
        draft.changePasswordDone = true;
        draft.changePasswordLoading = false;
        break;
      case CHANGE_PASSWORD_FAILURE:
        draft.changePasswordLoading = false;
        draft.changePasswordError = action.error;
        break;

      case CHANGE_THEME_REQUEST:
        draft.changeThemeLoading = true;
        draft.changeThemeDone = false;
        draft.changeThemeError = null;
        break;
      case CHANGE_THEME_SUCCESS:
        draft.changeThemeDone = true;
        draft.changeThemeLoading = false;
        break;
      case CHANGE_THEME_FAILURE:
        draft.changeThemeLoading = false;
        draft.changeThemeError = action.error;
        break;

      default:
        return state;
    }
  });

export default reducer;
