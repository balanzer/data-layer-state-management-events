import { Logger } from "../logger/log";
import {
  updatePage,
  updateApplication,
  updatePreviousPage,
} from "../store/slice/pageSlice";

import {
  updatePrivacy,
  updateDevice,
  updateErrors,
  updateMarketing,
  updateUser,
} from "../store/slice/otherSlice";

import store from "../store/store";
import { AppLogEvents } from "./events/app-events";
import { UserProfileHandler } from "./handlers/user-profile-handler";

import pageSample from "../data/samples/data/page-sample.json";
import deviceSample from "../data/samples/data/device-sample.json";
import privacySample from "../data/samples/data/privacy-sample.json";

import errorSample from "../data/samples/data/error-sample.json";
import marketingSample from "../data/samples/data/marketing-sample.json";
import userSample from "../data/samples/data/user-sample.json";
import userAnonSample from "../data/samples/data/user-anon-sample.json";

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

    processUserData();
    processMarketingData();
    processPrivacyData();
    processDeviceData();
    processPageData();

    //save data for next page
    saveData();

    //log app event
    AppLogEvents.addAppLogEvent("Page ready");
  }
}
function processUserData() {
  const userSignedIn = sessionStorage.getItem("userSignedIn");
  if (!!userSignedIn && userSignedIn === "true") {
    //user data
    store.dispatch(updateUser(userSample.user));
  } else {
    store.dispatch(updateUser(userAnonSample.user));
  }
}
function processMarketingData() {
  //marketing data
  store.dispatch(updateMarketing(marketingSample.marketing));
}
function processPrivacyData() {
  // add privacy data
  const privacy: any = privacySample.privacy;
  store.dispatch(updatePrivacy(privacy));
}
function processPageData() {
  /*generate page data */

  const page: any = pageSample.page;
  const application: any = pageSample.application;
  const previousPageDataStr: any = sessionStorage.getItem("previousPageData");
  const previousPageData: any = !!previousPageDataStr
    ? JSON.parse(previousPageDataStr)
    : {};

  /**update page values */

  let primaryCategory = document.title.toLowerCase().replace(/\s/g, "-");
  let subCategory = "";
  let contentPage = "";

  if (location.pathname.includes("details.html")) {
    subCategory = "local-guide-whats-nearby";
  }

  page.pageInfo = {
    domain: "ihg.com",
    path: location.pathname,
    query: location.search,
    referringURL: document.referrer,
    title: document.title,
  };
  page.category = {
    primaryCategory: primaryCategory,
    subCategory: subCategory,
    contentPage: contentPage,
  };
  page.brand = {
    brandCode: "hi",
    brandName: "Holidayinn",
  };

  store.dispatch(updatePage(page));
  store.dispatch(updatePreviousPage(previousPageData));
  store.dispatch(updateApplication(application));
}
function processDeviceData() {
  //add device data
  store.dispatch(updateDevice(deviceSample.device));
}

function handlePageErrors() {
  if (
    !!(location as any).search &&
    !!(location as any).search.includes("errorFlow=true")
  ) {
    //error data
    store.dispatch(updateErrors(errorSample.error));
  }
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

window.addEventListener("app-user-sign-in", function (e) {
  sessionStorage.setItem("userSignedIn", "true");
  processUserData();
});
window.addEventListener("app-user-sign-out", function (e) {
  sessionStorage.setItem("userSignedIn", "false");
  processUserData();
});
