import { configureStore } from "@reduxjs/toolkit";
import { Logger } from "../logger/log";
import taskReducer from "./slice/tasks";

const logger = new Logger("store");
const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

export default store;
