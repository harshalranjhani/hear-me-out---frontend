import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    playlistsContainerOpen: false,
    artistsContainerOpen: false,
    recentlyPlayedTracksContainerOpen: false
  },
  reducers: {
    togglePlaylistContainer(state, action) {
      const newState = { ...state, playlistsContainerOpen: !state.playlistsContainerOpen };
      return newState;
    },
    toggleArtistContainer(state, action) {
      const newState = { ...state, artistsContainerOpen: !state.artistsContainerOpen };
      return newState;
    },
    toggleTracksContainer(state,action){
      const newState = { ...state, recentlyPlayedTracksContainerOpen: !state.recentlyPlayedTracksContainerOpen };
      return newState;
    }
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
