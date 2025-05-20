import { Logger } from "./logger/log";
import { AppTasks } from "./app-flow/app-task";
import { ClickListners } from "./listners/click-listners";
import { AppLogEvents } from "./data/events/app-events";
import { Page } from "./data/models/Page";

import { GenerateData } from "./data/generate-data";
import store from "./store/store";
import { updatePage } from "./store/slice/pageSlice";

const logger = new Logger("main-app");

if (location.pathname.includes("/todo.html")) {
  //INIT Todo tasks app
  const appTasks: AppTasks = new AppTasks();
  appTasks.setupListners();
  appTasks.addDummyTasks();
}

const clickListners: ClickListners = new ClickListners();

// method is accessible globally
(window as any).handleListnerTaskComplete =
  clickListners.handleListnerTaskComplete.bind(clickListners);

(window as any).handleListnerTaskRemove =
  clickListners.handleListnerTaskRemove.bind(clickListners);

(window as any).handleSignIn = clickListners.handleSignIn.bind(clickListners);

(window as any).handleSignOut = clickListners.handleSignOut.bind(clickListners);

(window as any).handleEnableDebug =
  clickListners.handleEnableDebug.bind(clickListners);

const generateData = new GenerateData();

generateData.handlePageLoad();
