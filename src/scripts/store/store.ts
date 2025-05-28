import { configureStore } from "@reduxjs/toolkit";
import { Logger } from "../logger/log";
import taskReducer from "./slice/tasks";
import pageReducer from "./slice/pageSlice";
import {
  deviceReducer,
  privacyReducer,
  userReducer,
  errorReducer,
  marketingReducer,
} from "./slice/otherSlice";
import userProfileReducer from "./slice/userProfile";
import { DataAppEvents } from "../data/events/data-events";

import { LogActions } from "./middleware/logActions";
import { logger as redux_mw_logger } from "redux-logger";

const logger = new Logger("store");
const logActions = new LogActions();

const store = configureStore({
  reducer: {
    page: pageReducer,
    tasks: taskReducer,
    userProfile: userProfileReducer,
    device: deviceReducer,
    privacy: privacyReducer,
    user: userReducer,
    errors: errorReducer,
    marketing: marketingReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([logActions.log, redux_mw_logger]),
});

function handleChange() {
  let currentValue = store.getState();

  if (!!currentValue) {
    var jsonPrint = JSON.stringify(currentValue, undefined, 2);
    logger.info("current data : ", currentValue);

    //update UI

    //text area
    (document.getElementById("data-state-text") as any).value = jsonPrint;

    //json pre
    (document.getElementById("data-state-json") as any).textContent = jsonPrint;
  }
}

const unsubscribe = store.subscribe(handleChange);
//handle unsubscribe if reqd
DataAppEvents.addDataEvent("data:init");
export default store;
