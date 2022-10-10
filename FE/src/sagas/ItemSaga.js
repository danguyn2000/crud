import * as actions from "../actions/ItemPageAction";
import * as types from "../constants";
import callAPI from "../fetchAPIs/callAPI";
import { put, takeEvery, select } from "redux-saga/effects";

function* handlePaginate(action) {
  try {
    const res = yield callAPI(
      "GET",
      `?activePage=${action.payload}&limit=${types.limit}`
    );
    if (res.totalPage === 0) {
      res.totalPage = 1;
    }
    yield put(
      actions.paginateItemSuccess({
        listData: res.listData,
        totalPage: res.totalPage,
        activePage: action.payload,
      })
    );
  } catch (error) {
    yield put(actions.paginateItemFailure(error));
  }
}
function* handleSearch(action) {
  try {
    const res = yield callAPI(
      "GET",
      `/search?activePage=${action.payload.activePage}&nameSearch=${action.payload.nameSearch}&limit=${types.limit}`
    );
    if (res.totalPage === 0) {
      res.totalPage = 1;
    }
    yield put(
      actions.searchItemSuccess({
        listData: res.listData,
        totalPage: res.totalPage,
        activePage: action.payload.activePage,
        nameSearch: action.payload.nameSearch,
      })
    );
  } catch (error) {
    yield put(actions.searchItemFailure(error));
  }
}

function* handleAdd(action) {
  try {
    const store = yield select((state) => state.items);
    let formData = new FormData();
    for (let i = 0; i < action.payload.img.length; i++) {
      formData.append("img", action.payload.img[i]);
    }
    formData.append("name", action.payload.name);
    yield callAPI("POST", "", formData);
    yield put(actions.addItemSuccess());
    const res = yield callAPI(
      "GET",
      `?activePage=${store}&limit=${types.limit}`
    );
    yield put(actions.paginateItemRequest(res.totalPage));
  } catch (error) {
    yield put(actions.addItemFailure(error));
  }
}

function* handleDelete(action) {
  try {
    const store = yield select((state) => state.items);
    yield callAPI("DELETE", `/${action.payload.id}`);
    yield put(actions.deleteItemSuccess());
    if (store.listData.length === 1 && store.activePage === 1) {
      yield put(actions.paginateItemRequest((store.activePage = 1)));
    } else if (store.listData.length === 1) {
      yield put(actions.paginateItemRequest((store.totalPage -= 1)));
    } else {
      yield put(actions.paginateItemRequest(store.activePage));
    }
  } catch (error) {
    yield put(actions.deleteItemFailure(error));
  }
}

function* handleUpdate(action) {
  try {
    let formData = new FormData();
    for (let i = 0; i < action.payload.img.length; i++) {
      formData.append("img", action.payload.img[i]);
    }
    formData.append("name", action.payload.name);
    yield callAPI("PUT", `/${action.payload.id}`, formData);
    yield put(actions.updateItemSuccess());
    yield put(actions.paginateItemRequest(1));
  } catch (error) {
    yield put(actions.updateItemFailure(error));
  }
}

function* handleDeleteOne(action) {
  try {
    yield callAPI(
      "DELETE",
      `?id=${action.payload.id}&index=${action.payload.index}`
    );
    yield put(actions.deleteOneItemSuccess());
    yield put(actions.paginateItemRequest(1));
  } catch (error) {
    yield put(actions.deleteOneItemFailure(error));
  }
}

const ItemSaga = [
  takeEvery(types.PAGINATE_ITEMS_REQUEST, handlePaginate),
  takeEvery(types.ADD_ITEMS_REQUEST, handleAdd),
  takeEvery(types.DELETE_ITEMS_REQUEST, handleDelete),
  takeEvery(types.UPDATE_ITEMS_REQUEST, handleUpdate),
  takeEvery(types.SEARCH_ITEMS_REQUEST, handleSearch),
  takeEvery(types.DELETE_ONE_ITEMS_REQUEST, handleDeleteOne),
];

export default ItemSaga;
