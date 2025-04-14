import { Logger } from "./logger/log";
import { AppDataLayer } from "./data/data-layer";
import { ClickListners } from "./listners/click-listners";
import store from "./store/store";
import { addTask } from "./store/slice/tasks";

const logger = new Logger("app");

logger.info("Hello World App");

//data for debug
const appDataLayer = new AppDataLayer();
appDataLayer.setDataForUI();

const clickListners = new ClickListners();
//handle click listners
const allReminders = document.querySelector("#get-reminders");
// Add the event listener
allReminders?.addEventListener("click", clickListners.handleClickAllReminders);

store.dispatch(addTask({ task: "Task 1" }));
store.dispatch(addTask({ task: "Task 2" }));

logger.info("getState : ", store.getState());

store.dispatch(addTask({ task: "Task 1" }));
store.dispatch(addTask({ task: "Task 2" }));

logger.info("getState : ", store.getState());
