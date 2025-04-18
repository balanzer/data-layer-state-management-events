import { AppLogEvents } from "../../data/events/app-events";
import { Logger } from "../../logger/log";

export class LogActions {
  logger = new Logger("middleware-log");
  log = (store) => (next) => (action) => {
    //this.logger.info("dispatching action: ", action);
    AppLogEvents.addAppLogEvent(action.type);
    next(action);
  };
}
