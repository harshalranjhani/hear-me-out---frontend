import React from "react";
import { useSelector } from "react-redux";
import Login from "./Login/Login";

import Welcome from "./Welcome/Welcome";
import Player from "./Player/Player";
import Search from "./Search/Search";
import { Analytics } from "@vercel/analytics/react";

function Home(props) {
  const accessToken = useSelector((state) => state.auth.accessToken);
  return (
    <div>
      <Analytics key={"home"} />
      {!accessToken && <Login />}
      {accessToken && <Welcome />}
      {accessToken && <Player />}
      {accessToken && <Search />}
    </div>
  );
}

export default Home;
