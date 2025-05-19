import { Logger } from "../../logger/log";

export class AppLogEvents {
  static logger = new Logger("app-tasks");
  static app_log_events: string[] = [];
  static getAppLogEvents() {
    return this.app_log_events;
  }
  static addAppLogEvent(eventName) {
    this.app_log_events.push(eventName);

    //this.logger.info("app events : ", this.app_log_events);
    //update UI with latest data
    const parentElement = document.getElementById("app-events-ul");
    if (!!parentElement) {
      parentElement.innerHTML = "";

      const arrLen = this.app_log_events.length;

      const tmpArr =
        arrLen <= 8
          ? this.app_log_events.reverse()
          : this.app_log_events.reverse().slice(0, 8);

      var indexKey = 1;

      for (const eventName of tmpArr) {
        const newChildElement = document.createElement("li");
        newChildElement.classList = "list-group-item";
        newChildElement.innerText = arrLen - indexKey + " - " + eventName;
        parentElement.appendChild(newChildElement);
        indexKey++;
      }
    }
  }
}
