import { combineReducers } from "redux";
import { login } from "./login";
import { bluetoothConnectionStatus } from "./bluetoothConnectionStatus";
import { page } from "./page"

export const rootReducer = combineReducers({
  login,
  bluetoothConnectionStatus,
  page
})