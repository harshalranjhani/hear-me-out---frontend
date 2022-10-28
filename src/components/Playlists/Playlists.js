import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Paper,
  Drawer,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { styled } from "@mui/system";
import { uiActions } from "../../store/ui-slice";

const Playlists = () => {
  const isOpen = useSelector((state) => state.ui.playlistsContainerOpen);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();
  const [playlists, setPlaylists] = useState([]);
  useEffect(() => {
    const getPlaylists = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/playlists",
        {
          headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
          },
        }
      );
      setPlaylists(response.data.items);
      // setPlaylists([
      //   { name: "isubf" },
      //   { name: "sjfb" },
      //   { name: "isubf" },
      //   { name: "sjfb" },
      //   { name: "isubf" },
      //   { name: "sjfb" },
      //   { name: "isubf" },
      //   { name: "sjfb" },
      //   { name: "isubf" },
      //   { name: "sjfb" },
      //   { name: "isubf" },
      //   { name: "sjfb" },
      //   { name: "isubf" },
      //   { name: "sjfb" },
      //   { name: "isubf" },
      //   { name: "sjfb" },
      //   { name: "isubf" },
      //   { name: "sjfb" },
      //   { name: "isubf" },
      //   { name: "sjfb" },
      // ]);
    };

    getPlaylists();
  }, [accessToken]);

  const DrawerDiv = styled(Paper)({
    backgroundColor: "#82A67D",
    color: "#white",
    height: "100%",
    overflowY: "auto",
    fontSize: "1.4rem",
  });
  return (
    <>
      <Drawer
        anchor={"left"}
        open={isOpen}
        onClose={() => dispatch(uiActions.togglePlaylistContainer())}
      >
        <DrawerDiv>
          <Box p={2} width="250px" textAlign="center" role="presentation">
            <Typography variant="h6" component="div">
              Playlists
            </Typography>
          </Box>
          {playlists.map((item) => (
            <Box
              p={2}
              width="250px"
              textAlign="center"
              role="presentation"
              key={item.name}
            >
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
                {item.name}
              </Typography>
            </Box>
          ))}
        </DrawerDiv>
      </Drawer>
    </>
  );
};

export default Playlists;
