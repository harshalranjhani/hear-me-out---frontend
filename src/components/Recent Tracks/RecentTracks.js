import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Paper, Drawer, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { uiActions } from "../../store/ui-slice";

const RecentTracks = () => {
  const isOpen = useSelector(
    (state) => state.ui.recentlyPlayedTracksContainerOpen
  );
  const accessToken = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();
  const [recentlyPlayedTracks, setRecentlyPlayedTracks] = useState([]);
  useEffect(() => {
    const getSavedTracks = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/player/recently-played",
        {
          headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
          },
        }
      );
      //   console.log(response);
      setRecentlyPlayedTracks(response.data.items);
    };

    getSavedTracks();
  }, [accessToken]);

  const DrawerDiv = styled(Paper)({
    backgroundColor: "#82A67D",
    color: "#white",
    height: "50vh",
    width: "100%",
    overflowY: "auto",
    fontSize: "1.4rem",
  });
  console.log(recentlyPlayedTracks);
  return (
    <>
      <Drawer
        anchor={"top"}
        open={isOpen}
        sx={{
          height: "100%",
          width: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClose={() => dispatch(uiActions.toggleTracksContainer())}
      >
        <DrawerDiv>
          <Box
            p={2}
            textAlign="center"
            sx={{
              width: "100vw",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            role="presentation"
          >
            <Typography variant="h6" component="div">
              Recent Tracks
            </Typography>
          </Box>
          {recentlyPlayedTracks.map((item, i) => (
            <Box p={2} textAlign="center" role="presentation" key={i}>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  color: "#344e41",
                  "&:hover": {
                    color: "white",
                    cursor: "pointer",
                  },
                }}
              >
                {item.track.name} : <i>{item.track.album.name}</i>
              </Typography>
            </Box>
          ))}
        </DrawerDiv>
      </Drawer>
    </>
  );
};

export default RecentTracks;
