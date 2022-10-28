import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import classes from "./Login.module.css";
import Marquee from "react-fast-marquee";
import MarqueeText from "../MarqueeText/MarqueeText";
import useAuth from "../../hooks/useAuth";

const clientId = "46f8b7fe2f6a4e36b35466d68bb81637";
const redirectUrl = "http://localhost:3000";
const scope = [
  "user-read-private",
  "user-read-email",
  "user-modify-playback-state",
  "user-read-playback-state",
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-top-read",
  "user-follow-modify",
  "user-follow-read",
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-private",
  "playlist-modify-public",
  "app-remote-control",
  "streaming",
  "user-read-playback-position",
];
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${clientId}&show_dialog=true&redirect_uri=${redirectUrl}&response_type=code&scope=${scope.join(
  " "
)}`;

const code = new URLSearchParams(window.location.search).get("code");
// console.log(code);

function Login(props) {
  const accessToken = useAuth(code);
  // console.log(accessToken);
  const clickHandler = () => {
    window.location.href = AUTH_URL;
  };
  const SpotifyButton = styled(Button)({
    backgroundColor: "black",
    color: "#49F585",
    fontSize: "1.4rem",
    borderRadius: "5rem",
    "&:hover": {
      backgroundColor: "black",
      color: "white",
    },
    padding: "1rem 5rem",
  });

  return (
    <div>
      {!accessToken && (
        <div className={classes.buttonDiv}>
          <SpotifyButton onClick={clickHandler}>Connect Spotify</SpotifyButton>
        </div>
      )}
      <Marquee
        style={{ width: "100%" }}
        className={classes.marqueeContainer}
        gradient={false}
        speed={100}
        pauseOnClick={true}
      >
        <MarqueeText />
      </Marquee>
      <Marquee
        className={classes.marqueeContainer}
        gradient={false}
        pauseOnClick={true}
        speed={35}
      >
        <MarqueeText />
      </Marquee>
      <Marquee
        className={classes.marqueeContainer}
        pauseOnClick={true}
        gradient={false}
        speed={80}
      >
        <MarqueeText />
      </Marquee>
      {accessToken && <h1>Welcome</h1>}
    </div>
  );
}

export default Login;
