import { Logger } from "../logger/log";
import {
  updatePage,
  updateApplication,
  updatePreviousPage,
} from "../store/slice/pageSlice";
import store from "../store/store";
import { AppLogEvents } from "./events/app-events";
import { Page } from "./models/Page";
import { UserProfileHandler } from "./handlers/user-profile-handler";

import pageSample from "../data/samples/data/page-sample.json";
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

    const page: any = pageSample.page;
    const application: any = pageSample.application;
    const previousPageDataStr: any = sessionStorage.getItem("previousPageData");
    const previousPageData: any = !!previousPageDataStr
      ? JSON.parse(previousPageDataStr)
      : {};
    store.dispatch(updatePage(page));
    store.dispatch(updatePreviousPage(previousPageData));
    store.dispatch(updateApplication(application));

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
  if (!!currentState && !!currentState.page && !!currentState.page.page) {
    const pageData = currentState.page.page;
    //console.log("page data for previous : ", pageData);
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
