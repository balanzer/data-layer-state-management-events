import { createSlice } from "@reduxjs/toolkit";
import { Logger } from "../../logger/log";
import { DataAppEvents } from "../../data/events/data-events";

const logger = new Logger("profile-slice");

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState: [],
  reducers: {
    updatePastStays: (state: any, action) => {
      const data: any = action.payload;
      DataAppEvents.addDataEvent("userProfile:pastStays:update");
      return data;
    },
  },
});

export const { updatePastStays } = userProfileSlice.actions;
export default userProfileSlice.reducer;
