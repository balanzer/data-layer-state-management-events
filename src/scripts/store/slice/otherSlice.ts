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

const cartSlice = createSlice({
  name: "cart",
  initialState: {},
  reducers: {
    updateCart: (state: any, action) => {
      const data: any = action.payload;
      DataAppEvents.addDataEvent("cart:update");
      return data;
    },
  },
});

const transactionSlice = createSlice({
  name: "transaction",
  initialState: {},
  reducers: {
    updateTransaction: (state: any, action) => {
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

const searchSlice = createSlice({
  name: "search",
  initialState: {},
  reducers: {
    updateSearchInfo: (state: any, action) => {
      const data: any = action.payload;
      return data;
    },
  },
});
const productSlice = createSlice({
  name: "product",
  initialState: {},
  reducers: {
    updateHotelInfo: (state: any, action) => {
      const data: any = action.payload;
      return data;
    },
  },
});
const ratesSlice = createSlice({
  name: "roomRates",
  initialState: {},
  reducers: {
    updateRatesInfo: (state: any, action) => {
      const data: any = action.payload;
      DataAppEvents.addDataEvent("rates:update");
      return data;
    },
  },
});

const appDataSlice = createSlice({
  name: "appData",
  initialState: {},
  reducers: {
    updateAppDataInfo: (state: any, action) => {
      const data: any = action.payload;
      return data;
    },
  },
});

export const { updateDevice } = deviceSlice.actions;
export const { updatePrivacy } = privacySlice.actions;
export const { updateErrors } = errorSlice.actions;
export const { updateMarketing } = marketingSlice.actions;
export const { updateUser } = userSlice.actions;
export const { updateSearchInfo } = searchSlice.actions;
export const { updateHotelInfo } = productSlice.actions;
export const { updateRatesInfo } = ratesSlice.actions;
export const { updateAppDataInfo } = appDataSlice.actions;
export const { updateCart } = cartSlice.actions;
export const { updateTransaction } = transactionSlice.actions;

export const deviceReducer = deviceSlice.reducer;
export const privacyReducer = privacySlice.reducer;
export const errorReducer = errorSlice.reducer;
export const marketingReducer = marketingSlice.reducer;
export const userReducer = userSlice.reducer;
export const searchReducer = searchSlice.reducer;
export const productReducer = productSlice.reducer;
export const ratesReducer = ratesSlice.reducer;
export const appDataReducer = appDataSlice.reducer;
export const cartReducer = cartSlice.reducer;
export const transactionReducer = transactionSlice.reducer;
