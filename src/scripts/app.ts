import { Logger } from "./logger/log";
import { AppTasks } from "./app-flow/app-task";

import logAppEvent from "./data/events/app-events";
import logDataEvent from "./data/events/data-events";

const logger = new Logger("main-app");

//INIT Todo tasks app
const appTasks: AppTasks = new AppTasks();
appTasks.setupListners();
appTasks.addDummyTasks();

logAppEvent("app loaded");
logDataEvent("app loaded");
