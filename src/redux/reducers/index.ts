// Auto-Generated from gen_component. DO NOT EDIT MANUALLY
import { combineReducers } from 'redux'
import example from './example';
import landing from './landing';
import auth from './auth';
import portfolio from "./portfolio";
import transfer from "./transfer";
import order from './order';

const sequinsApp = combineReducers({
  example,
  landing,
  auth,
  portfolio,
  transfer,
  order,
})

export default sequinsApp