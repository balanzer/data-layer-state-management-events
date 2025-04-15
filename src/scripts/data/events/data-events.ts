
export class DataAppEvents {
  static data_events: string[] = [];
  static getDataEvents() {
    return this.data_events;
  }
  static addDataEvent(eventName) {
    this.data_events.push(eventName);

    //update UI with latest data
    const parentElement = document.getElementById("data-events-ul");
    if (!!parentElement) {
      parentElement.innerHTML = "";

      for (const eventName of this.data_events) {
        const newChildElement = document.createElement("li");
        newChildElement.classList = "list-group-item";
        newChildElement.innerText = eventName;
        parentElement.appendChild(newChildElement);
      }
    }
  }
}
