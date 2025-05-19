import { Logger } from "../../logger/log";
import { updateProfileData } from "../../store/slice/userProfile";
import store from "../../store/store";

import pastStays from ".././samples/profile/past-stays.json";
import profileData from ".././samples/profile/my-profile.json";
import tierInfo from ".././samples/profile/tier-info.json";

import { DATA_VALUES } from ".././samples/config";
export class UserProfileHandler {
  logger = new Logger("user-profile-handler");
  constructor() {}
  loadProfileData() {
    const userProfile = {
      pastStays: pastStays,
      tierInfo: tierInfo,
      userProfile: profileData,
    };

    store.dispatch(updateProfileData(userProfile));
  }
}
