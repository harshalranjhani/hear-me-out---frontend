import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Paper, Drawer, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { uiActions } from "../../store/ui-slice";

const FollowedArtists = () => {
  const isOpen = useSelector((state) => state.ui.artistsContainerOpen);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();
  const [artists, setArtists] = useState([]);
  useEffect(() => {
    const getArtists = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/following?type=artist",
        {
          headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(response);
      setArtists(response.data.artists.items);
    };

    getArtists();
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
        anchor={"right"}
        open={isOpen}
        onClose={() => dispatch(uiActions.toggleArtistContainer())}
      >
        <DrawerDiv>
          <Box p={2} width="250px" textAlign="center" role="presentation">
            <Typography variant="h6" component="div">
              Artists
            </Typography>
          </Box>
          {artists.map((item) => (
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

export default FollowedArtists;
