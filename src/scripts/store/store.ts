import { configureStore } from "@reduxjs/toolkit";
import { Logger } from "../logger/log";
import taskReducer from "./slice/tasks";
import pageReducer from "./slice/pageSlice";
import { DataAppEvents } from "../data/events/data-events";

import { LogActions } from "./middleware/logActions";
import { logger as redux_mw_logger } from "redux-logger";


const logger = new Logger("store");
const logActions = new LogActions();

const store = configureStore({
  reducer: {
    page: pageReducer,
    tasks: taskReducer,
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
    //logger.info("current state : ", currentValue);

    var jsonPrint = JSON.stringify(currentValue, undefined, 4);
    logger.info("current data : ", currentValue);

    //update UI

    //text area
    (document.getElementById("data-state-text") as any).value = jsonPrint;
  }
}

const unsubscribe = store.subscribe(handleChange);
//handle unsubscribe if reqd
DataAppEvents.addDataEvent("data:init");
export default store;
