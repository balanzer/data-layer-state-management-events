import { createSlice } from "@reduxjs/toolkit";
import { Logger } from "../../logger/log";
import { DataAppEvents } from "../../data/events/data-events";

const logger = new Logger("other-slice");

const deviceSlice = createSlice({
  name: "device",
  initialState: {},
  reducers: {
    updateDevice: (state: any, action) => {
      const data: any = action.payload;
      state = data;

      DataAppEvents.addDataEvent("device:update");
      return data;
    },
  },
});

const privacySlice = createSlice({
  name: "privacy",
  initialState: {},
  reducers: {
    updatePrivacy: (state: any, action) => {
      const data: any = action.payload;
      DataAppEvents.addDataEvent("privacy:update");
      return data;
    },
  },
});

const errorSlice = createSlice({
  name: "errors",
  initialState: {},
  reducers: {
    updateErrors: (state: any, action) => {
      const data: any = action.payload;
      return data;
    },
  },
});

const marketingSlice = createSlice({
  name: "marketing",
  initialState: {},
  reducers: {
    updateMarketing: (state: any, action) => {
      const data: any = action.payload;
      return data;
    },
  },
});

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    updateUser: (state: any, action) => {
      const data: any = action.payload;
      DataAppEvents.addDataEvent("user:update");
      return data;
    },
  },
});

export const { updateDevice } = deviceSlice.actions;
export const { updatePrivacy } = privacySlice.actions;
export const { updateErrors } = errorSlice.actions;
export const { updateMarketing } = marketingSlice.actions;
export const { updateUser } = userSlice.actions;

export const deviceReducer = deviceSlice.reducer;
export const privacyReducer = privacySlice.reducer;
export const errorReducer = errorSlice.reducer;
export const marketingReducer = marketingSlice.reducer;
export const userReducer = userSlice.reducer;
