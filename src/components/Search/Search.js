import React, { useCallback, useEffect } from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import SearchResults from "./SearchResults";
import ArtistRecommendations from "./ArtistRecommendations";
import { Button } from "@mui/material";
import { uiActions } from "../../store/ui-slice";

export default function Search() {
  const searchTerm = useRef();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [searchData, setSearchData] = React.useState([]);
  const [recommendationData, setRecommendationData] = React.useState([]);
  const [buttonText, setButtonText] = React.useState(
    "View playlists for this search query"
  );
  const viewStateFromRedux = useSelector(
    (state) => state.ui.showPlaylistSearchResults
  );
  const currentTrack = useSelector((state) => state.tracks.currentTrack);
  let artistIds = [];
  let artists = [];
  if (currentTrack.item) {
    artists = currentTrack.item.artists;
  }
  artists.map((artist) => {
    return artistIds.push(artist.id);
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchTerm.current.value.trim() === "") {
      setSearchData([]);
      return;
    }
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${searchTerm.current.value}&type=track,artist,album,playlist&include_external=audio&limit=35`,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      }
    );
    // console.log(response);
    setSearchData(response.data);
  };

  useEffect(() => {
    // console.log(artistIds);
    const getRecommendations = async () => {
      const response = await axios.get(
        `https://api.spotify.com/v1/recommendations?seed_artists=${artistIds.join(
          ","
        )}&limit=50`,
        {
          headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
          },
        }
      );
      setRecommendationData(response.data);
      // console.log(recommendationData);
    };

    // if (currentTrack && !searchData.length) {
    //   getRecommendations();
    // }
    getRecommendations();
  }, [accessToken, artists]);

  const dispatch = useDispatch();

  const toggleShowPlaylists = () => {
    dispatch(uiActions.toggleShowPlaylistsOnSearch());
    console.log(viewStateFromRedux);
    if (viewStateFromRedux) {
      setButtonText("View playlists for this search query");
    } else {
      setButtonText("Back to Tracks and Artists");
    }
  };

  return (
    <div style={{ width: 700 }}>
      <div style={{ display: "flex" }}>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1 },
          }}
          onSubmit={handleSubmit}
          width={500}
          p={3}
          noValidate
          autoComplete="off"
        >
          <Input
            onChange={(e) => {
              if (e.target.value === "") {
                setSearchData([]);
              }
            }}
            inputRef={searchTerm}
            fullWidth
            placeholder="Search for songs, artists and more"
            inputProps={"search"}
          />
        </Box>
        {searchData.length === 0 ? (
          <></>
        ) : (
          <Button
            variant="primary"
            style={{ width: "500px" }}
            onClick={toggleShowPlaylists}
          >
            {buttonText}
          </Button>
        )}
      </div>
      {searchData.length === 0 ? (
        <ArtistRecommendations recommendationData={recommendationData} />
      ) : (
        <Box>
          <SearchResults searchData={searchData} />
        </Box>
      )}
    </div>
  );
}
