import { Logger } from "../logger/log";
import { updatePage } from "../store/slice/pageSlice";
import store from "../store/store";
import { AppLogEvents } from "./events/app-events";
import { Page } from "./models/Page";
import { UserProfileHandler } from "./handlers/user-profile-handler";
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
function processTrackingJson() {}
function handlePageErrors() {
  //TODO: handle page errors
}

function processAPIResponse() {
  if (
    !!(location as any).search &&
    !!(location as any).search.includes("debug=true")
  ) {
    const profileHandler = new UserProfileHandler();
    profileHandler.loadProfileData();
    //TODO: handle API Response
  }
}
