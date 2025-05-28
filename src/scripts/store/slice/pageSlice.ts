import { createSlice } from "@reduxjs/toolkit";
import { Logger } from "../../logger/log";
import { DataAppEvents } from "../../data/events/data-events";
import { Page } from "./../../data/models/Page";

const logger = new Logger("page-slice");

const pageSlice = createSlice({
  name: "page",
  initialState: { page: {}, previousPage: {}, application: {} },
  reducers: {
    // action: function

    updatePage: (state: any, action) => {
      const page: any = action.payload;
      DataAppEvents.addDataEvent("page:update");

      state.page = page;

      //return page;
    },
    updatePreviousPage: (state: any, action) => {
      const previousPage: any = action.payload;
      //DataAppEvents.addDataEvent("page:previous:update");

      state.previousPage = previousPage;
    },
    updateApplication: (state: any, action) => {
      const app: any = action.payload;
      //DataAppEvents.addDataEvent("page:previous:update");
      state.application = app;
    },
  },
});

export const { updatePage, updateApplication, updatePreviousPage } =
  pageSlice.actions;
export default pageSlice.reducer;
