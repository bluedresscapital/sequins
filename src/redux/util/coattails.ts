const COATTAILS_HOSTNAME = process.env.REACT_APP_COATTAILS_HOSTNAME
const PROD = process.env.NODE_ENV === "production"

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
  const urlPrefix = PROD ? "https://" : "http://"
  return fetch(urlPrefix + COATTAILS_HOSTNAME + endpoint, init)
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

let socket;

export function dialSock(onopenCb: any, onmsgCb: any) {
  const urlPrefix = PROD ? "wss://" : "ws://"
  socket = new WebSocket(urlPrefix + COATTAILS_HOSTNAME + "/auth/websocket")
  socket.onopen = onopenCb
  socket.onmessage = e => onmsgCb(e.data)
}

export function closeSock() {
  socket.close()
}