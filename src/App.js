import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import Login from "./components/Login/Login";
import Playlists from "./components/Playlists/Playlists";
import Navbar from "./components/Navbar/Navbar";
import Welcome from "./components/Welcome/Welcome";
import FollowedArtists from "./components/Artists/FollowedArtists";
import Search from "./components/Search/Search";
import Player from "./components/Player/Player";
import RecentTracks from "./components/Recent Tracks/RecentTracks";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Feed from "./components/Feed/Feed";
import { current } from "@reduxjs/toolkit";
import PlaylistDetails from "./components/Playlists/PlaylistDetails";
import ArtistDetails from "./components/Artists/ArtistDetails";
import LargeScreen from "./components/LargeScreen/LargeScreen";
import useWindowSize from "./utils";
import { Analytics } from "@vercel/analytics/react"

function App() {
  const accessToken = useSelector((state) => state.auth.accessToken);
  // const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  // console.log(accessToken);
  const currentUser = useSelector((state) => state.user.user);
  const size = useWindowSize();
  const [displayWidth, setDisplayWidth] = useState(size.width);
  useEffect(() => {
    setDisplayWidth(size.width);
  }, [size]);

  if (displayWidth < 1280) {
    return <LargeScreen />;
  }
  return (
    <div className="App">
      <Navbar />
      {accessToken && <Playlists />}
      {accessToken && <FollowedArtists />}
      {accessToken && <RecentTracks />}
      {currentUser && (
        <Routes>
          <Route path="/" element={<Home />} />
          {accessToken && <Route path="/feed" element={<Feed />} />}
          {accessToken && (
            <Route path="/playlist/:id" element={<PlaylistDetails />} />
          )}
          {accessToken && (
            <Route path="/artist/:id" element={<ArtistDetails />} />
          )}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
