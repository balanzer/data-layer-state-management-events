import { Logger } from "../../logger/log";
import { updatePastStays } from "../../store/slice/userProfile";
import store from "../../store/store";

import pastStays from ".././samples/profile/past-stays.json";

import { DATA_VALUES } from ".././samples/config";
export class UserProfileHandler {
  logger = new Logger("user-profile-handler");
  constructor() {}
  loadProfileData() {
    //const profileData = JSON.parse(DATA_VALUES.profile.userprofile);
    //const tierInfo = JSON.parse(DATA_VALUES.profile.tierinfo);

    store.dispatch(updatePastStays(pastStays));
    //console.log("pastStays Data: ", pastStays);
  }
}
