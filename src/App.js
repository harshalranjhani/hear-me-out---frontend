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

function App() {
  const accessToken = useSelector((state) => state.auth.accessToken);
  // const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  // console.log(accessToken);
  const currentUser = useSelector((state) => state.user.user);
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
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
