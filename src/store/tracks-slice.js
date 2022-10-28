import { createSlice } from "@reduxjs/toolkit";

const tracksSlice = createSlice({
  name: "tracks",
  initialState: {
    currentTrack: {},
  },
  reducers: {
    setCurrentTrack(state, action) {
      // console.log("setting current track to redux store...");
      const newState = { currentTrack: action.payload.currentTrack };
      return newState;
    },
  },
});

export const tracksActions = tracksSlice.actions;
export default tracksSlice;
