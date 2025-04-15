import { Logger } from "../../logger/log";

const logger = new Logger("data-events");

const data_layer_events: string[] = [];

function updateUIForDataEvents() {}

function handleEvent(event) {
  const eventData = (event as any).detail;
  const eventName: string = eventData.eventName;
  const payload: any = eventData.payload;

  logger.info("new data event : ", eventName, payload);

  data_layer_events.push(eventName);
  updateUIForDataEvents();
}
window.addEventListener("dl-sm-data-events", handleEvent);

logger.info("added data event listner");

function logDataEvent(eventName: string, payload = {}) {
  const customEvent = new CustomEvent("dl-sm-data-events", {
    detail: {
      eventName: eventName,
      payload: payload,
    },
  });

  window.dispatchEvent(customEvent);
}

export default logDataEvent;
