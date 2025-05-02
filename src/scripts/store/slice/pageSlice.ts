import { createSlice } from "@reduxjs/toolkit";
import { Logger } from "../../logger/log";
import { DataAppEvents } from "../../data/events/data-events";
import { Page } from "./../../data/models/Page";

const logger = new Logger("page-slice");

const pageSlice = createSlice({
  name: "page",
  initialState: [],
  reducers: {
    // action: function
    createPage: (state: any, action) => {
      const page = new Page();
      state.push(page);
      DataAppEvents.addDataEvent("data:page:new");
    },
    updatePage: (state: any, action) => {
      const page = new Page();
      state.push(page);
      DataAppEvents.addDataEvent("data:page:new");
    },
  },
});

export const { createPage, updatePage } = pageSlice.actions;
export default pageSlice.reducer;
