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

export function get(endpoint, initPayload, succCb, errCb) {
  console.log("hello", COATTAILS_HOSTNAME)
}