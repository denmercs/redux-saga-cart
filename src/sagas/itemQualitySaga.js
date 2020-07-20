import { takeLatest, select, put, call } from "redux-saga/effects";

import fetch from "isomorphic-fetch";
import {
  INCREASE_ITEM_QUANTITY,
  DECREASE_ITEM_QUANTITY,
  setItemQuantityFetchStatus,
  decreaseItemQuantity,
  FETCHING,
  FETCHED,
} from "../actions";

import { currentUserSelector } from "../selectors";

export function* handleIncreaseQuantity({ id }) {
  yield put(setItemQuantityFetchStatus(FETCHING));
  const user = yield select(currentUserSelector);
  const response = yield call(
    fetch,
    `http://localhost:8081/cart/add/${user.get("id")}/${id}}`
  );
  console.info("GET response", response);
}

export function* itemQuantitySaga() {
  yield [
    // takeLatest(DECREASE_ITEM_QUANTITY, handleDecreaseItemQuantity),
    takeLatest(INCREASE_ITEM_QUANTITY, handleIncreaseQuantity),
  ];
}
