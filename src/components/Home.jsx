import React from "react";
import { useSelector } from "react-redux";
import Login from "./Login/Login";

import Welcome from "./Welcome/Welcome";
import Player from "./Player/Player";
import Search from "./Search/Search";

function Home(props) {
  const accessToken = useSelector((state) => state.auth.accessToken);
  return (
    <div>
      {!accessToken && <Login />}
      {accessToken && <Welcome />}
      {accessToken && <Player />}
      {accessToken && <Search />}
    </div>
  );
}

export default Home;
