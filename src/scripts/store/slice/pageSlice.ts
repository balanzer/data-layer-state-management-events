import { createSlice } from "@reduxjs/toolkit";
import { Logger } from "../../logger/log";
import { DataAppEvents } from "../../data/events/data-events";
import { Page } from "./../../data/models/Page";

const logger = new Logger("page-slice");

const pageSlice = createSlice({
  name: "page",
  initialState: {},
  reducers: {
    // action: function

    updatePage: (state: any, action) => {
      const page: Page = action.payload;
      DataAppEvents.addDataEvent("page:update");
      return page;
    },
  },
});

export const { updatePage } = pageSlice.actions;
export default pageSlice.reducer;
