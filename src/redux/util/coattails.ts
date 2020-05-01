const COATTAILS_HOSTNAME = process.env.REACT_APP_COATTAILS_HOSTNAME

export function post(endpoint: string, initPayload: object, succCb, errCb?) {
  if (!errCb) {
    errCb = e => {}
  }
  let headers = {
    "Content-Type": "application/json",
  };
  let init = Object.assign({ headers, method: "POST", credentials: 'include' }, initPayload)
  return fetchWrapper(endpoint, init, succCb, errCb)
}

export function get(endpoint, initPayload, succCb, errCb?) {
  if (!errCb) {
    errCb = e => {}
  }
  let headers = {
    "Content-Type": "application/json",
  }
  let init = Object.assign({ headers, method: "GET", credentials: 'include' }, initPayload)
  return fetchWrapper(endpoint, init, succCb, errCb)
}

function fetchWrapper(endpoint, init, succCb, errCb) {
  return fetch(COATTAILS_HOSTNAME + endpoint, init)
    .then(res => {
      if (res.status === 200) {
        return res.json()
      }
      // return errCb({ status: res.status, msg: "Received non 200 response" })
      throw Error(res.status + "")
    })
    .then(succCb)
    .catch(e => {
      errCb(parseInt(e.toString().replace("Error:", "").trim()))
    })
}