import { useSelector } from "react-redux";
import "./App.css";
import Login from "./components/Login/Login";
import Playlists from "./components/Playlists/Playlists";
import Navbar from "./components/Navbar/Navbar";
import Welcome from "./components/Welcome/Welcome";
import FollowedArtists from "./components/Artists/FollowedArtists";
import Search from "./components/Search/Search";
import Player from "./components/Player/Player";
import { Alert, AlertTitle } from "@mui/material";
import RecentTracks from "./components/Recent Tracks/RecentTracks";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Feed from "./components/Feed/Feed";

function App() {
  const accessToken = useSelector((state) => state.auth.accessToken);
  // const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  // console.log(accessToken);
  const currentUser = useSelector((state) => state.user.user);
  // console.log(currentUser);
  return (
    <div className="App">
      <Navbar />
      {accessToken && <Playlists />}
      {accessToken && <FollowedArtists />}
      {accessToken && <RecentTracks />}
      <Routes>
        <Route path="/" element={<Home />} />
        {accessToken && <Route path="/feed" element={<Feed />} />}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {!currentUser && (
        <Alert severity="error" sx={{ width: "50vh", margin: "auto" }}>
          <AlertTitle>Error</AlertTitle>
          Something went wrong —{" "}
          <strong>Try logging out and logging back in!</strong>
        </Alert>
      )}
    </div>
  );
}

export default App;
