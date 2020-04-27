export const ADD_NUM = 'ADD_NUM';
export const SUB_NUM = 'SUB_NUM';
export const RESET_NUM = 'RESET_NUM';

export function addNum() {
  return { type: ADD_NUM }
}

export function subNum() {
  return { type: SUB_NUM }
}

export function resetNum() {
  return { type: RESET_NUM }
}
