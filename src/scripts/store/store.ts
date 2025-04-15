import { configureStore } from "@reduxjs/toolkit";
import { Logger } from "../logger/log";
import taskReducer from "./slice/tasks";
import {
  devToolsEnhancer,
  composeWithDevTools,
} from "redux-devtools-extension";
import { DataAppEvents } from "../data/events/data-events";

const logger = new Logger("store");

const store = configureStore({
  reducer: {
    action: null,
    tasks: taskReducer,
  },
  devTools: true,
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
