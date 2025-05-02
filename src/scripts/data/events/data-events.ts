import { Logger } from "../../logger/log";

export class DataAppEvents {
  static logger = new Logger("app-tasks");
  static data_events: string[] = [];
  static getDataEvents() {
    return this.data_events;
  }
  static addDataEvent(eventName) {
    setTimeout(() => {
      this.handleDataEvent(eventName);
    }, 300);
  }
  static handleDataEvent(eventName) {
    this.data_events.push(eventName);
    this.logger.info("data events : ", this.data_events);
    //update UI with latest data
    const parentElement = document.getElementById("data-events-ul");
    if (!!parentElement) {
      parentElement.innerHTML = "";

      const arrLen = this.data_events.length;

      const tmpArr =
        arrLen <= 8
          ? this.data_events.reverse()
          : this.data_events.reverse().slice(0, 8);

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
