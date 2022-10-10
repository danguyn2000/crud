import * as types from "../constants";

const DEFAULT_STATE = {
  listData: [],
  isFetching: false,
  dataFetched: false,
  error: false,
  errorMessage: null,
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case types.PAGINATE_ITEMS_REQUEST:
    case types.ADD_ITEMS_REQUEST:
    case types.DELETE_ITEMS_REQUEST:
    case types.DELETE_ONE_ITEMS_REQUEST:
    case types.UPDATE_ITEMS_REQUEST:
    case types.SEARCH_ITEMS_REQUEST:
      return {
        ...state,
        isFetching: true,
        datatFetched: false,
        error: false,
        errorMessage: null,
      };
    case types.ADD_ITEMS_SUCCESS:
    case types.DELETE_ITEMS_SUCCESS:
    case types.DELETE_ONE_ITEMS_SUCCESS:
    case types.UPDATE_ITEMS_SUCCESS:
      return {
        ...state,
        isFetching: false,
      };
    case types.PAGINATE_ITEMS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        datatFetched: true,
        error: false,
        errorMessage: null,
        listData: action.payload.listData,
        activePage: action.payload.activePage,
        totalPage: action.payload.totalPage,
      };
    case types.SEARCH_ITEMS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        datatFetched: true,
        error: false,
        errorMessage: null,
        listData: action.payload.listData,
        activePage: action.payload.activePage,
        totalPage: action.payload.totalPage,
        nameSearch: action.payload.nameSearch,
      };
    case types.PAGINATE_ITEMS_FAILURE:
    case types.ADD_ITEMS_FAILURE:
    case types.DELETE_ITEMS_FAILURE:
    case types.DELETE_ONE_ITEMS_FAILURE:
    case types.UPDATE_ITEMS_FAILURE:
    case types.SEARCH_ITEMS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: false,
        errorMessage: action.payload.errorMessage,
      };
    default:
      return state;
  }
};
