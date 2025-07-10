import produce from "../util/produce";

export const initialState = {
  putLogLoading: false,
  putLogDone: false,
  putLogError: null,
  loadLogListsLoading: false,
  loadLogListsDone: false,
  loadLogListsError: null,
  datas: {},
  logs: [],
};

export const PUT_LOG_FAILURE = "PUT_LOG_FAILURE";
export const PUT_LOG_SUCCESS = "PUT_LOG_SUCCESS";
export const PUT_LOG_REQUEST = "PUT_LOG_REQUEST";

export const LOAD_LOGLISTS_FAILURE = "LOAD_LOGLISTS_FAILURE";
export const LOAD_LOGLISTS_SUCCESS = "LOAD_LOGLISTS_SUCCESS";
export const LOAD_LOGLISTS_REQUEST = "LOAD_LOGLISTS_REQUEST";

export const putlogAction = (data) => {
  return {
    type: PUT_LOG_SUCCESS,
    data,
  };
};

export const loadloglistsRequestAction = (data) => {
  return {
    type: LOAD_LOGLISTS_SUCCESS,
    data,
  };
};

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case PUT_LOG_REQUEST:
        draft.putLogLoading = true;
        draft.putLogError = null;
        draft.putLogDone = false;
        break;
      case PUT_LOG_SUCCESS:
        draft.putLogLoading = false;
        draft.putLogDone = true;
        draft.datas = action.data;
        break;
      case PUT_LOG_FAILURE:
        draft.putLogLoading = false;
        draft.putLogError = action.error;
        break;

      case LOAD_LOGLISTS_REQUEST:
        draft.loadLogListsLoading = true;
        draft.loadLogListsError = null;
        draft.loadLogListsDone = false;
        break;
      case LOAD_LOGLISTS_SUCCESS:
        draft.loadLogListsLoading = false;
        draft.loadLogListsDone = true;
        draft.logs = action.data;
        break;
      case LOAD_LOGLISTS_FAILURE:
        draft.loadLogListsLoading = false;
        draft.loadLogListsError = action.error;
        break;

      default:
        return state;
    }
  });

export default reducer;
