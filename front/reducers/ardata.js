import produce from "../util/produce";

export const initialState = {
  loadArdatasLoading: false,
  loadArdatasDone: false,
  loadArdatasError: null,
  datas: {},
  logs: [],
};


export const LOAD_ARDATA_FAILURE = "LOAD_ARDATA_FAILURE";
export const LOAD_ARDATA_SUCCESS = "LOAD_ARDATA_SUCCESS";
export const LOAD_ARDATA_REQUEST = "LOAD_ARDATA_REQUEST";



export const loadArdatasRequestAction = (data) => {
  // console.log('log',data)
  return {
    type: LOAD_ARDATA_SUCCESS,
    data,
  };
};

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD_ARDATA_REQUEST:
        draft.loadArdatasLoading = true;
        draft.loadArdatasError = null;
        draft.loadArdatasDone = false;
        break;
      case LOAD_ARDATA_SUCCESS:
        draft.loadArdatasLoading = false;
        draft.loadArdatasDone = true;
        draft.logs = action.data;
        break;
      case LOAD_ARDATA_FAILURE:
        draft.loadArdatasLoading = false;
        draft.loadArdatasError = action.error;
        break;

      default:
        return state;
    }
  });

export default reducer;
