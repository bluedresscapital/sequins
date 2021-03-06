// Example action file. Generated by gen_component
import * as coattails from '../util/coattails';

export const LOADING_PORTS = 'LOADING_PORTS';
export const LOADED_PORTS = 'LOADED_PORTS';
export const SELECT_PORT = 'SELECT_PORT';
export const ADDING_PORT = 'ADDING_PORT';
export const ADDED_PORT = 'ADDED_PORT';
export const ERR_ADDING_PORT = 'ERR_ADDING_PORT';
export const RESET_REDIRECT = 'RESET_REDIRECT;'
export const LOADING_PORT_HISTORIES = 'LOADING_PORT_HISTORIES';
export const LOADED_PORT_HISTORIES = 'LOADED_PORT_HISTORIES';
export const LOADED_PORT_COMPARISON = 'LOADED_PORT_COMPARISON';
export const RELOAD_CURRENT_PORT_VALUES = 'RELOAD_CURRENT_PORT_VALUES';
export const RELOAD_DAILY_PORT_VALUES = 'RELOAD_DAILY_PORT_VALUES';
export const LOADED_FEATURED_PORTS = 'LOADED_FEATURED_PORTS';

export function loadPortfolios() {
  return dispatch => {
    dispatch({ type: LOADING_PORTS })
    const succCb = portfolios => dispatch({ type: LOADED_PORTS, portfolios })
    return coattails.get("/auth/portfolio", {}, succCb)
  }
}

export function loadPortfolioValues() {
  return dispatch => {
    const succCb = payload => dispatch({ type: RELOAD_CURRENT_PORT_VALUES, payload })
    return coattails.get("/auth/portfolio/values", {}, succCb)
  }
}

export function loadDailyPortValues() {
  return dispatch => {
    const succCb = payload => dispatch({ type: RELOAD_DAILY_PORT_VALUES, payload })
    return coattails.get("/auth/portfolio/daily_values", {}, succCb)
  }
}

export function loadFeaturedPortfolios() {
  return dispatch => {
    window.setTimeout(() => {
      const payload = [
        { id: 1, name: "$BECKY", tags: ["TECH", "RETAIL"], growth: 1.3 },
        { id: 2, name: "HW BIOFUND", tags: ["BIO", "TECH", "FINANCE"], growth: 1.4 },
        { id: 3, name: "$CHAD", tags: ["FITNESS", "RETAIL", "FINANCE"], growth: 0.7 },
        ]
      dispatch({ type: LOADED_FEATURED_PORTS, payload })
    }, 500)
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

export function addPortfolio(name, type, tdCode, tdAccNum, rhUsername, rhPassword, rhDeviceToken) {
  return dispatch => {
    dispatch({type: ADDING_PORT})
    if (type==='tda') {
      let body = JSON.stringify({name, code: tdCode, account_num: tdAccNum})
      const succCb = portfolios => dispatch({type: ADDED_PORT, portfolios})
      return coattails.post("/auth/tda/portfolio/create", {body}, succCb)
    } else if (type==='rh') {
      let body = JSON.stringify({name, username: rhUsername, password: rhPassword, device_token: rhDeviceToken})
      const succCb = portfolios => dispatch({type: ADDED_PORT, portfolios})
      return coattails.post("/auth/rh/portfolio/create", {body}, succCb)
    } else {
      let body = JSON.stringify({name, type});
      const succCb = portfolios => dispatch({ type: ADDED_PORT, portfolios })
      const errCb = e => {
        console.log("ERR", e)
        dispatch({ type: ERR_ADDING_PORT, error: e })
      }
      return coattails.post("/auth/portfolio/create", {body}, succCb, errCb)
    }
  }
}

export function updateTDPortfolio(portId, name, code, accNum) {
  return dispatch => {
    const succCb = portfolios => console.log("success!", portfolios)
    let body = JSON.stringify({port_id: portId, name, code: code, account_num: accNum})
    return coattails.post("/auth/tda/portfolio/update", {body}, succCb)
  }
}

export function loadPortHistories() {
  return dispatch => {
    dispatch({ type: LOADING_PORT_HISTORIES })
    const succCb = histories => {
      dispatch({ type: LOADED_PORT_HISTORIES, payload: histories })
      let start = null
      let end = null
      for (let portId in histories) {
        const history  = histories[portId]
        if (history.length === 0) {
          continue
        }
        if (start == null || history[0].date < start) {
          start = history[0].date.split("T")[0]
        }
        if (end == null || history[history.length - 1].date > end) {
          end = history[history.length - 1].date.split("T")[0]
        }
      }
      const url = "/stock/quote/SPY?start="  + start + "&end=" + end
      const stockSuccCb = quotes => {
        dispatch({ type: LOADED_PORT_COMPARISON, comparison: quotes })
      }
      return coattails.get(url, {}, stockSuccCb)
    }
    return coattails.get("/auth/portfolio/history", {}, succCb)
  }
}
