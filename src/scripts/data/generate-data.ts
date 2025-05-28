import { Logger } from "../logger/log";
import { updatePage } from "../store/slice/pageSlice";
import store from "../store/store";
import { AppLogEvents } from "./events/app-events";
import { Page } from "./models/Page";
import { UserProfileHandler } from "./handlers/user-profile-handler";
export class GenerateData {
  logger = new Logger("generate-data");
  constructor() {
    this.logger.log("init");
  }

  handlePageLoad() {
    const pathname = location.pathname;
    this.logger.log("handle path : ", pathname);

    handlePageErrors();
    processAPIResponse();
    processTrackingJson();

    //log app event
    AppLogEvents.addAppLogEvent("Page ready");

    /* Remove */

    // test

    const page = new Page();

    store.dispatch(updatePage(page));
    this.logger.log("Page Updated : ", store.getState());

    /* Remove */

    //save data for next page
    saveData();
  }
}
function processTrackingJson() {}
function handlePageErrors() {
  //TODO: handle page errors
}

function saveData() {
  //save page data for previous page
  const currentState = store.getState();
  if (!!currentState && !!currentState.page) {
    const pageData = currentState.page;
    console.log("page data : ", pageData);
    sessionStorage.setItem("previousPageData", JSON.stringify(pageData));
  }
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
