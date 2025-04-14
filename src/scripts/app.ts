import { Logger } from "./logger/log";
import { AppDataLayer } from "./data/data-layer";
import { ClickListners } from "./listners/click-listners";
import store from "./store/store";
import { addTask } from "./store/slice/tasks";

const logger = new Logger("app");

store.dispatch(addTask({ task: "Task 1" }));
store.dispatch(addTask({ task: "Task 2" }));
