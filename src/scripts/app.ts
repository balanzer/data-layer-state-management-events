import { Logger } from "./logger/log";
import { AppTasks } from "./app-flow/app-task";
import { ClickListners } from "./listners/click-listners";
import { AppLogEvents } from "./data/events/app-events";


const logger = new Logger("main-app");

//INIT Todo tasks app
const appTasks: AppTasks = new AppTasks();
appTasks.setupListners();
appTasks.addDummyTasks();

//add some tasks

const task1 = appTasks.getRandomTask();
appTasks.addTask(task1.taskName, task1.taskDesc);

const clickListners: ClickListners = new ClickListners();
// method is accessible globally
(window as any).handleListnerTaskComplete =
  clickListners.handleListnerTaskComplete.bind(clickListners);

(window as any).handleListnerTaskRemove =
  clickListners.handleListnerTaskRemove.bind(clickListners);

//log app event
AppLogEvents.addAppLogEvent("App ready");
