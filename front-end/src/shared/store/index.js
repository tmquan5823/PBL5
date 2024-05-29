import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";

import auth from "./auth";
import deliveredNotifs from "./deliveredNotifs";

const reducer = combineReducers({
  auth,
  deliveredNotifs,
});

const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
