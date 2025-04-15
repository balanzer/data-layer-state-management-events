import { Logger } from "../../logger/log";

const logger = new Logger("app-events");

const app_events: string[] = [];

function updateUIForAppEvents() {}

function handleEvent(event) {
  const eventData = (event as any).detail;
  const eventName = eventData.eventName;
  const payload = eventData.payload;

  logger.info("new data event : ", eventName, payload);

  app_events.push(eventName);
  updateUIForAppEvents();
}
window.addEventListener("dl-sm-app-events", handleEvent);

logger.info("added app event listner");

function logAppEvent(eventName: string, payload = {}) {
  const customEvent = new CustomEvent("dl-sm-app-events", {
    detail: {
      eventName: eventName,
      payload: payload,
    },
  });

  window.dispatchEvent(customEvent);
}

export default logAppEvent;
