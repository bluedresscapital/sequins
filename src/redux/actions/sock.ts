// Example action file. Generated by gen_component
import * as coattails from '../util/coattails';

export const CONNECTING = 'SOCK_CONNECTING';
export const CONNECTED = 'SOCK_CONNECTED';

export function connect(username, connecting, connected) {
  return dispatch => {
    if (username == null || connecting || connected) {
      return
    }
    dispatch({ type: CONNECTING })

    const onopenCb = () => {
      dispatch({type: CONNECTED})
    }

    const onmsgCb = msg => {
      let data = JSON.parse(msg)
      const { type, payload } = data
      let payloadData = JSON.parse(payload)
      dispatch({ type, payload: payloadData })
    }

    coattails.dialSock(onopenCb, onmsgCb);
  }
}
