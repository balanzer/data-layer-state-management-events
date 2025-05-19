import { createSlice } from "@reduxjs/toolkit";
import { Logger } from "../../logger/log";
import { DataAppEvents } from "../../data/events/data-events";

const logger = new Logger("profile-slice");

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState: [],
  reducers: {
    updateProfileData: (state: any, action) => {
      const data: any = action.payload;
      DataAppEvents.addDataEvent("userProfile:update");
      return data;
    },
  },
});

export const { updateProfileData } = userProfileSlice.actions;
export default userProfileSlice.reducer;
