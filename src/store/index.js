import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import userSlice from "./user-slice";
import uiSlice from "./ui-slice";
import tracksSlice from "./tracks-slice";
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    user: userSlice.reducer,
    ui: uiSlice.reducer,
    tracks: tracksSlice.reducer,
  },
});

export default store;
