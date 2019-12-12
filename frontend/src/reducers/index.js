import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import requestMsg from "./requestMsg";
import room from "./room";
import user from "./user";

export const generateReducers = history =>
  combineReducers({
    router: connectRouter(history),
    requestMsg,
    room,
    user,
  })