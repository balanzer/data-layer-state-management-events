import { Logger } from "./logger/log";
import { AppTasks } from "./app-flow/app-task";

const logger = new Logger("main-app");

//INIT Todo tasks app
const appTasks: AppTasks = new AppTasks();
appTasks.setupListners();
appTasks.addDummyTasks();

//add some tasks
appTasks.addTask("Buy Apple", "some dummy desc");
appTasks.addTask("Sell Car", "some dummy desc");
appTasks.addTask("Buy Milk", "some dummy desc");

//remove tasks
appTasks.removeTask(1001);
appTasks.removeTask(1002);

//add some tasks
appTasks.addTask("Do workout", "some dummy desc");
appTasks.addTask("Plan PTO", "some dummy desc");

//mark task as complete

appTasks.markComplete(1003);
appTasks.markComplete(1004);
