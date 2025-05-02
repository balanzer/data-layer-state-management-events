import { Logger } from "./logger/log";
import { AppTasks } from "./app-flow/app-task";
import { ClickListners } from "./listners/click-listners";
import { AppLogEvents } from "./data/events/app-events";
import { Page } from "./data/models/Page";

import store from "./store/store";
import { createPage, updatePage } from "./store/slice/pageSlice";

const logger = new Logger("main-app");

//INIT Todo tasks app
const appTasks: AppTasks = new AppTasks();
appTasks.setupListners();
//if (location.pathname.includes("/todo.html")) {
appTasks.addDummyTasks();
//}

const clickListners: ClickListners = new ClickListners();
// method is accessible globally
(window as any).handleListnerTaskComplete =
  clickListners.handleListnerTaskComplete.bind(clickListners);

(window as any).handleListnerTaskRemove =
  clickListners.handleListnerTaskRemove.bind(clickListners);

//log app event

AppLogEvents.addAppLogEvent("Page ready");

// test

const page = new Page();

logger.log("Page : ", page);

store.dispatch(createPage({}));
logger.log("Page created : ", store.getState());

store.dispatch(updatePage({}));
logger.log("Page Updated : ", store.getState());
