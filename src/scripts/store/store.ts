import { configureStore } from "@reduxjs/toolkit";
import { Logger } from "../logger/log";
import taskReducer from "./slice/tasks";

const logger = new Logger("store");
const store = configureStore({
  reducer: {
    action: null,
    tasks: taskReducer,
  },
});

function handleChange() {
  let currentValue = store.getState();

  if (!!currentValue) {
    //logger.info("current state : ", currentValue);

    var jsonPrint = JSON.stringify(currentValue, undefined, 4);
    //logger.info("current state : ", jsonPrint);

    //update UI
    (document.getElementById("data-state-text") as any).value = jsonPrint;
  }
}

const unsubscribe = store.subscribe(handleChange);
//handle unsubscribe if reqd

export default store;
