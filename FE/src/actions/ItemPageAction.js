import * as types from "../constants";

export function paginateItemRequest(payload) {
  return {
    type: types.PAGINATE_ITEMS_REQUEST,
    payload,
  };
}

export function paginateItemSuccess(payload) {
  return {
    type: types.PAGINATE_ITEMS_SUCCESS,
    payload,
  };
}

export function paginateItemFailure(payload) {
  return {
    type: types.PAGINATE_ITEMS_FAILURE,
    payload,
  };
}

export function addItemRequest(payload) {
  return {
    type: types.ADD_ITEMS_REQUEST,
    payload,
  };
}

export function addItemSuccess(payload) {
  return {
    type: types.ADD_ITEMS_SUCCESS,
    payload,
  };
}

export function addItemFailure(payload) {
  return {
    type: types.ADD_ITEMS_FAILURE,
    payload,
  };
}

export function deleteItemRequest(payload) {
  return {
    type: types.DELETE_ITEMS_REQUEST,
    payload,
  };
}

export function deleteItemSuccess(payload) {
  return {
    type: types.DELETE_ITEMS_SUCCESS,
    payload,
  };
}

export function deleteItemFailure(payload) {
  return {
    type: types.DELETE_ITEMS_FAILURE,
    payload,
  };
}

export function updateItemRequest(payload) {
  return {
    type: types.UPDATE_ITEMS_REQUEST,
    payload,
  };
}

export function updateItemSuccess(payload) {
  return {
    type: types.UPDATE_ITEMS_SUCCESS,
    payload,
  };
}

export function updateItemFailure(payload) {
  return {
    type: types.UPDATE_ITEMS_FAILURE,
    payload,
  };
}

export function searchItemRequest(payload) {
  return {
    type: types.SEARCH_ITEMS_REQUEST,
    payload,
  };
}

export function searchItemSuccess(payload) {
  return {
    type: types.SEARCH_ITEMS_SUCCESS,
    payload,
  };
}

export function searchItemFailure(payload) {
  return {
    type: types.SEARCH_ITEMS_FAILURE,
    payload,
  };
}

export function deleteOneItemRequest(payload) {
  return {
    type: types.DELETE_ONE_ITEMS_REQUEST,
    payload,
  };
}

export function deleteOneItemSuccess(payload) {
  return {
    type: types.DELETE_ONE_ITEMS_SUCCESS,
    payload,
  };
}

export function deleteOneItemFailure(payload) {
  return {
    type: types.DELETE_ONE_ITEMS_FAILURE,
    payload,
  };
}
