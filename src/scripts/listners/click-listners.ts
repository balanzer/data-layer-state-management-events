import { AppTasks } from "../app-flow/app-task";
import { Logger } from "../logger/log";
import { AppServer } from "../server/server";

export class ClickListners {
  handleListnerTaskComplete(id: number) {
    //console.log("handleListnerTaskComplete ", id);
    const appTasks: AppTasks = new AppTasks();
    appTasks.markComplete(id);
  }

  handleListnerTaskRemove(id: number) {
    //console.log("handleListnerTaskRemove ", id);

    const appTasks: AppTasks = new AppTasks();
    appTasks.removeTask(id);
  }
}
