import { Logger } from "../logger/log";
import { updatePage } from "../store/slice/pageSlice";
import store from "../store/store";
import { AppLogEvents } from "./events/app-events";
import { Page } from "./models/Page";

export class GenerateData {
  logger = new Logger("generate-data");
  constructor() {
    this.logger.info("init");
  }

  handlePageLoad() {
    const pathname = location.pathname;
    this.logger.info("handle path : ", pathname);

    handlePageErrors();
    processAPIResponse();
    processTrackingJson();

    //log app event
    AppLogEvents.addAppLogEvent("Page ready");

    // test

    const page = new Page();
    page.setPageName("test");
    page.setPageCategory("test Category");

    store.dispatch(updatePage(page));
    this.logger.log("Page Updated : ", store.getState());
  }
}
function processTrackingJson() {

}
function handlePageErrors() {
  //TODO: handle page errors
}

function processAPIResponse() {
  //TODO: handle API Response
  
}
