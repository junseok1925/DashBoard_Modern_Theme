import produce from "../util/produce";

export const initialState = {
  putReportdataLoading: false,
  putReportdataDone: false,
  putReportdataError: null,
  datas: {},
};

export const PUT_REPORTDATA_FAILURE = "PUT_REPORTDATA_FAILURE";
export const PUT_REPORTDATA_SUCCESS = "PUT_REPORTDATA_SUCCESS";
export const PUT_REPORTDATA_REQUEST = "PUT_REPORTDATA_REQUEST";

export const putreportdataAction = (data) => {
  return {
    type: PUT_REPORTDATA_SUCCESS,
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

    const ago5days = () => {
      //5일전 날짜
      var yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 5);
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

    switch (action.type) {
      case PUT_REPORTDATA_REQUEST:
        draft.putReportdataLoading = true;
        draft.putReportdataError = null;
        draft.putReportdataDone = false;
        break;
      case PUT_REPORTDATA_SUCCESS:
        draft.putReportdataLoading = false;
        draft.putReportdataDone = true;
        draft.datas = action.data;
        break;
      case PUT_REPORTDATA_FAILURE:
        draft.putReportdataLoading = false;
        draft.putReportdataError = action.error;
        break;

      default:
        return state;
    }
  });

export default reducer;
