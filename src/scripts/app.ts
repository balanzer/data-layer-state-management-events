import { Logger } from "./logger/log";
import { AppTasks } from "./app-flow/app-task";

const logger = new Logger("main-app");

//INIT Todo tasks app
const appTasks: AppTasks = new AppTasks();
appTasks.setupListners();
appTasks.addDummyTasks();
