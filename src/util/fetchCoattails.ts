const COATTAILS_HOSTNAME = process.env.COATTAILS_HOSTNAME ? process.env.COATTAILS_HOSTNAME : "http://127.0.0.1:8080"

export function post(endpoint: string, initPayload: object, succCb, errCb?) {
  if (!errCb) {
    errCb = e => {}
  }
  let headers = {
    "Content-Type": "application/json",
  };
  let init = Object.assign({ headers, method: "POST", credentials: 'include' }, initPayload)
  return fetch(COATTAILS_HOSTNAME + endpoint, init)
    .then(res => {
      if (res.ok) {
        return res.json()
      } else if (res.status === 401) {
        return { "status": "unauthorized" }
      }
      throw Error("internal server error")
    })
    .then(succCb)
    .catch(errCb)
}

export function get(endpoint, initPayload, succCb, errCb) {
  console.log("hello", COATTAILS_HOSTNAME)
}