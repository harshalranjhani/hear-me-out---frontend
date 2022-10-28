import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    code: "",
    accessToken: JSON.parse(localStorage.getItem("accessToken")) || "",
    refreshToken: JSON.parse(localStorage.getItem("refreshToken")) || "",
    expiresIn: 3600,
  },
  reducers: {
    setToken(state, action) {
      // console.log("setting token");
      const newState = {
        code: action.payload.code,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        expiresIn: action.payload.expiresIn,
      };
      localStorage.setItem("userAccess", JSON.stringify(newState));
      // console.log(newState);
      return newState;
    },
    setRefreshToken(state, action) {
      const newState = {
        ...state,
        accessToken: action.payload.accessToken,
        expiresIn: action.payload.expiresIn,
      };
      return newState;
    },
    logout(state, action) {
      const initialState = {
        code: "",
        accessToken: "",
        refreshToken: "",
        expiresIn: 3600,
      };
      return initialState;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
