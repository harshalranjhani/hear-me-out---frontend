import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth-slice";

export default function useAuth(code) {
  const dispatch = useDispatch();
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    axios
      .post("https://hear-me-out-backend.vercel.app/", { code })
      .then((res) => {
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        localStorage.setItem(
          "accessToken",
          JSON.stringify(res.data.accessToken)
        );
        localStorage.setItem(
          "refreshToken",
          JSON.stringify(res.data.refreshToken)
        );
        dispatch(
          authActions.setToken({
            code: code,
            accessToken: !JSON.parse(localStorage.getItem("accessToken")).length
              ? res.data.accessToken
              : JSON.parse(localStorage.getItem("accessToken")),
            refreshToken: res.data.refreshToken,
            expiresIn: res.data.expiresIn,
          })
        );
      })
      .then(() => window.history.replaceState({}, null, "/"))
      .catch((err) => {
        console.log(err.message);
      });
  }, [code]);

  useEffect(() => {
    const storedRefreshToken = JSON.parse(localStorage.getItem("refreshToken"));
    if (!storedRefreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      axios
        .post("https://hear-me-out-backend.vercel.app/", { storedRefreshToken })
        .then((res) => {
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
          localStorage.setItem("accessToken", JSON.stringify(accessToken));
          dispatch(
            authActions.setRefreshToken({
              accessToken: JSON.parse(localStorage.getItem("accessToken")),
              expiresIn: res.data.expiresIn,
            })
          );
        })
        .catch((err) => console.log(err.message));
      // .catch(() => (window.location.href = "/"));
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return accessToken;
}
