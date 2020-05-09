// Example reducer file. Generated by gen_component
import {
  LOADED_ORDERS,
  LOADING_ORDERS,
  UPSERTED_ORDER,
  UPSERTING_ORDER,
  ERR_UPSERTING_ORDER,
  RELOADING_ORDERS,
  RELOADED_ORDERS,
} from "../actions/order";

import {
  LOGGED_OUT
} from "../actions/auth";

const initialState = {
  orders: [] as any[],
  loading: false,
  upserting: false,
  reloading: false,
}

export default function order(state=initialState, action) {
  switch (action.type) {
    case LOADED_ORDERS:
      return {...state, loading: false, orders: action.orders}
    case LOADING_ORDERS:
      return {...state, loading: true}
    case UPSERTING_ORDER:
      return {...state, upserting: true}
    case UPSERTED_ORDER:
      return {...state, upserting: false, orders: action.orders}
    case ERR_UPSERTING_ORDER:
      return {...state, upserting: false } // TODO maybe include err msg?
    case LOGGED_OUT:
      return initialState
    case RELOADING_ORDERS:
      return {...state, reloading: true}
    case RELOADED_ORDERS:
      return {...state, reloading: false, orders: action.orders}
    default:
      return state
  }
}