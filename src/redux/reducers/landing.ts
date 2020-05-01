import { ADD_NUM, SUB_NUM, RESET_NUM } from "../actions/landing";

const initialState = {
  num: 0
}

export default function landing(state=initialState, action) {
  switch (action.type) {
    case ADD_NUM:
      return {...state, num: state.num + 1}
    case SUB_NUM:
      return {...state, num: state.num - 1}
    case RESET_NUM:
      return {...state, num: 0}
    default:
      return state
  }
}
