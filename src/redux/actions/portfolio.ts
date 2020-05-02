// Example action file. Generated by gen_component
import * as coattails from '../util/coattails';

export const LOADING_PORTS = 'LOADING_PORTS';
export const LOADED_PORTS = 'LOADED_PORTS';
export const SELECT_PORT = 'SELECT_PORT';
export const ADDING_PORT = 'ADDING_PORT';
export const ADDED_PORT = 'ADDED_PORT';
export const ERR_ADDING_PORT = 'ERR_ADDING_PORT';
export const RESET_REDIRECT = 'RESET_REDIRECT;'

export function loadPortfolios() {
  return dispatch => {
    dispatch({ type: LOADING_PORTS })
    const succCb = portfolios => dispatch({ type: LOADED_PORTS, portfolios })
    return coattails.get("/auth/portfolio", {}, succCb)
  }
}

export function resetRedirect() {
  return dispatch => {
    dispatch({ type: RESET_REDIRECT })
  }
}

export function selectPort(id) {
  return dispatch => {
    dispatch({ type: SELECT_PORT, id })
  }
}

export function addPortfolio(name, type) {
  return dispatch => {
    dispatch({type: ADDING_PORT})
    let body = JSON.stringify({name, type});
    const succCb = portfolio => dispatch({ type: ADDED_PORT, portfolio })
    const errCb = e => dispatch({ type: ERR_ADDING_PORT, error: e })
    return coattails.post("/auth/portfolio/create", {body}, succCb, errCb)
  }
}