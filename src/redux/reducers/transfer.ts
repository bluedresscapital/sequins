// Example reducer file. Generated by gen_component
import {
  LOADED_TRANSFERS,
  LOADING_TRANSFERS,
  UPSERTED_TRANSFER,
  UPSERTING_TRANSFER,
  ERR_UPSERTING_TRANSFER,
  RELOADED_TRANSFERS,
  RELOADING_TRANSFERS,
} from "../actions/transfer";

import {
  LOGGED_OUT
} from "../actions/auth";

const initialState = {
  transfers: [] as any[],
  loading: false,
  upserting: false,
  reloading: false,
}

export default function transfer(state=initialState, action) {
  switch (action.type) {
    case LOADED_TRANSFERS:
      return {...state, loading: false, transfers: action.transfers}
    case LOADING_TRANSFERS:
      return {...state, loading: true}
    case UPSERTING_TRANSFER:
      return {...state, upserting: true}
    case UPSERTED_TRANSFER:
      return {...state, upserting: false, transfers: action.transfers}
    case ERR_UPSERTING_TRANSFER:
      return {...state, upserting: false } // TODO maybe include err msg?
    case RELOADING_TRANSFERS:
      return {...state, reloading: true}
    case RELOADED_TRANSFERS:
      return {...state, reloading: false, transfers: action.transfers}
    case LOGGED_OUT:
      return initialState
    default:
      return state
  }
}