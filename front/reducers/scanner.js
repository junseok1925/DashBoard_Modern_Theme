import produce from "../util/produce";

export const initialState = {
  loadScannerListsLoading: false,
  loadScannerListsDone: false,
  loadScannerListsError: null,
  loadZoneListsLoading: false,
  loadZoneListsDone: false,
  loadZoneListsError: null,

  loadScannerListsStoneLoading: false,
  loadScannerListsStoneDone: false,
  loadScannerListsStoneError: null,
  loadZoneListsStoneLoading: false,
  loadZoneListsStoneDone: false,
  loadZoneListsStoneError: null,
  loadZoneSectionLoading: false,
  loadZoneSectionDone: false,
  loadZoneSectionError: null,
  datas: {},
  zonedatas: [],
  zonedatasStone: [],
  scanners: [],
  scannersStone: [],
  zonesection: "황리단길권역",
};

export const LOAD_SCANNERLISTS_FAILURE = "LOAD_SCANNERLISTS_FAILURE";
export const LOAD_SCANNERLISTS_SUCCESS = "LOAD_SCANNERLISTS_SUCCESS";
export const LOAD_SCANNERLISTS_REQUEST = "LOAD_SCANNERLISTS_REQUEST";

export const LOAD_ZONELISTS_FAILURE = "LOAD_ZONELISTS_FAILURE";
export const LOAD_ZONELISTS_SUCCESS = "LOAD_ZONELISTS_SUCCESS";
export const LOAD_ZONELISTS_REQUEST = "LOAD_ZONELISTS_REQUEST";

export const LOAD_SCANNERLISTS_STONE_FAILURE =
  "LOAD_SCANNERLISTS_STONE_FAILURE";
export const LOAD_SCANNERLISTS_STONE_SUCCESS =
  "LOAD_SCANNERLISTS_STONE_SUCCESS";
export const LOAD_SCANNERLISTS_STONE_REQUEST =
  "LOAD_SCANNERLISTS_STONE_REQUEST";

export const LOAD_ZONELISTS_STONE_FAILURE = "LOAD_ZONELISTS_STONE_FAILURE";
export const LOAD_ZONELISTS_STONE_SUCCESS = "LOAD_ZONELISTS_STONE_SUCCESS";
export const LOAD_ZONELISTS_STONE_REQUEST = "LOAD_ZONELISTS_STONE_REQUEST";

export const LOAD_ZONESECTION_FAILURE = "LOAD_ZONESECTION_FAILURE";
export const LOAD_ZONESECTION_SUCCESS = "LOAD_ZONESECTION_SUCCESS";
export const LOAD_ZONESECTION_REQUEST = "LOAD_ZONESECTION_REQUEST";

export const loadscannerlistsRequestAction = (data) => {
  return {
    type: LOAD_SCANNERLISTS_SUCCESS,
    data,
  };
};

export const loadzonelistsRequestAction = (data) => {
  return {
    type: LOAD_ZONELISTS_SUCCESS,
    data,
  };
};

export const loadscannerlistsStoneRequestAction = (data) => {
  return {
    type: LOAD_SCANNERLISTS_STONE_SUCCESS,
    data,
  };
};

export const loadzonelistsStoneRequestAction = (data) => {
  return {
    type: LOAD_ZONELISTS_STONE_SUCCESS,
    data,
  };
};

export const loadzoneSectionRequestAction = (data) => {
  return {
    type: LOAD_ZONESECTION_SUCCESS,
    data,
  };
};

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD_SCANNERLISTS_REQUEST:
        draft.loadScannerListsLoading = true;
        draft.loadScannerListsError = null;
        draft.loadScannerListsDone = false;
        break;
      case LOAD_SCANNERLISTS_SUCCESS:
        draft.loadScannerListsLoading = false;
        draft.loadScannerListsDone = true;
        draft.scanners = action.data;
        break;
      case LOAD_SCANNERLISTS_FAILURE:
        draft.loadScannerListsLoading = false;
        draft.loadScannerListsError = action.error;
        break;

      case LOAD_ZONELISTS_REQUEST:
        draft.loadZoneListsLoading = true;
        draft.loadZoneListsError = null;
        draft.loadZoneListsDone = false;
        break;
      case LOAD_ZONELISTS_SUCCESS:
        draft.loadZoneListsLoading = false;
        draft.loadZoneListsDone = true;
        draft.zonedatas = action.data;
        break;
      case LOAD_ZONELISTS_FAILURE:
        draft.loadZoneListsLoading = false;
        draft.loadZoneListsError = action.error;
        break;

      case LOAD_SCANNERLISTS_STONE_REQUEST:
        draft.loadScannerListsStoneLoading = true;
        draft.loadScannerListsStoneError = null;
        draft.loadScannerListsStoneDone = false;
        break;
      case LOAD_SCANNERLISTS_STONE_SUCCESS:
        draft.loadScannerListsStoneLoading = false;
        draft.loadScannerListsStoneDone = true;
        draft.scannersStone = action.data;
        break;
      case LOAD_SCANNERLISTS_STONE_FAILURE:
        draft.loadScannerListsStoneLoading = false;
        draft.loadScannerListsStoneError = action.error;
        break;

      case LOAD_ZONELISTS_STONE_REQUEST:
        draft.loadZoneListsStoneLoading = true;
        draft.loadZoneListsStoneError = null;
        draft.loadZoneListsStoneDone = false;
        break;
      case LOAD_ZONELISTS_STONE_SUCCESS:
        draft.loadZoneListsStoneLoading = false;
        draft.loadZoneListsStoneDone = true;
        draft.zonedatasStone = action.data;
        break;
      case LOAD_ZONELISTS_STONE_FAILURE:
        draft.loadZoneListsStoneLoading = false;
        draft.loadZoneListsStoneError = action.error;
        break;

      case LOAD_ZONESECTION_REQUEST:
        draft.loadZoneSecionLoading = true;
        draft.loadZoneSecionError = null;
        draft.loadZoneSecionDone = false;
        break;
      case LOAD_ZONESECTION_SUCCESS:
        draft.loadZoneSecionLoading = false;
        draft.loadZoneSecionDone = true;
        draft.zonesection = action.data;
        break;
      case LOAD_ZONESECTION_FAILURE:
        draft.loadZoneSecionLoading = false;
        draft.loadZoneSecionError = action.error;
        break;

      default:
        return state;
    }
  });

export default reducer;
