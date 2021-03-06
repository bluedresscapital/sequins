// Example action file. Generated by gen_component
import * as coattails from '../util/coattails';
import { getUid } from "./helpers";

export const LOADING_ORDERS = 'LOADING_ORDERS';
export const LOADED_ORDERS = 'LOADED_ORDERS';
export const UPSERTING_ORDER = 'UPSERTING_ORDER';
export const UPSERTED_ORDER = 'UPSERTED_ORDER';
export const ERR_UPSERTING_ORDER = 'ERR_ADDING_ORDER';
export const RELOADING_ORDERS = 'RELOADING_ORDERS';
export const RELOADED_ORDERS = 'RELOADED_ORDERS';

export function loadOrders() {
  return dispatch => {
    dispatch({ type: LOADING_ORDERS})
    const succCb = orders => dispatch({ type: LOADED_ORDERS, orders })
    return coattails.get("/auth/order", {}, succCb)
  }
}

export function upsertOrder(order) {
  return dispatch => {
    dispatch({type: UPSERTING_ORDER})
    if (!order.uid) {
      order.uid = getUid();
    }
    let body = JSON.stringify(order);
    const succCb = orders => dispatch({ type: UPSERTED_ORDER, orders })
    const errCb = e => dispatch({ type: ERR_UPSERTING_ORDER, error: e })
    return coattails.post("/auth/order/upsert", {body}, succCb, errCb)
  }
}

export function deleteOrder(uid: string, port_id: number) {
  return dispatch => {
    dispatch({type: UPSERTING_ORDER})
    let body = JSON.stringify({ uid, port_id })
    const succCb = orders => dispatch({ type: UPSERTED_ORDER, orders })
    return coattails.post("/auth/order/delete", {body}, succCb)
  }
}

export function reloadOrder(port_id: number) {
  return dispatch => {
    dispatch({type: RELOADING_ORDERS })
    let body = JSON.stringify({ port_id })
    const succCb = () => {}
    return coattails.post("/auth/order/reload", {body}, succCb)
  }
}
