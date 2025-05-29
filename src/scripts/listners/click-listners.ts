import { AppTasks } from "../app-flow/app-task";
import { Logger } from "../logger/log";
import { AppServer } from "../server/server";

export class ClickListners {
  handleListnerTaskComplete(id: number) {
    console.log("handleListnerTaskComplete ", id);
    const appTasks: AppTasks = new AppTasks();
    appTasks.markComplete(id);
  }

  handleListnerTaskRemove(id: number) {
    console.log("handleListnerTaskRemove ", id);

    const appTasks: AppTasks = new AppTasks();
    appTasks.removeTask(id);
  }

  handleSignIn() {
    console.log("handleSignIn");
    document.getElementById("app-sign-in").style.display = "none";
    document.getElementById("app-sign-out").style.display = "block";

    const eventUser = new CustomEvent("app-user-sign-in", {
      detail: {},
    });
    window.dispatchEvent(eventUser);
  }

  handleSignOut() {
    console.log("handleSignOut");
    document.getElementById("app-sign-in").style.display = "block";
    document.getElementById("app-sign-out").style.display = "none";

    const eventUser = new CustomEvent("app-user-sign-out", {
      detail: {},
    });
    window.dispatchEvent(eventUser);
  }

  handleEnableDebug() {
    let url = window.location.href;
    if (url.indexOf("debug=true") == -1) {
      if (url.indexOf("?") > -1) {
        url += "&debug=true";
      } else {
        url += "?debug=true";
      }
      window.location.href = url;
    }
  }
}
