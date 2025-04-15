export class AppLogEvents {
  static app_log_events: string[] = [];
  static getAppLogEvents() {
    return this.app_log_events;
  }
  static addAppLogEvent(eventName) {
    this.app_log_events.push(eventName);

    //update UI with latest data
    const parentElement = document.getElementById("app-events-ul");
    if (!!parentElement) {
      parentElement.innerHTML = "";

      for (const eventName of this.app_log_events) {
        const newChildElement = document.createElement("li");
        newChildElement.classList = "list-group-item";
        newChildElement.innerText = eventName;
        parentElement.appendChild(newChildElement);
      }
    }
  }
}
