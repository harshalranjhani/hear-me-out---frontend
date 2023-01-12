import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Moment from "react-moment";
import { Alert, AlertTitle } from "@mui/material";

const PlaylistDetails = () => {
  const [playlistData, setPlaylistData] = useState({});
  const { id: playlistId } = useParams();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const user = useSelector((state) => state.user.user);

  function followersFormat(num) {
    return num?.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  useEffect(() => {
    const getPlaylistData = async () => {
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${playlistId}`,
        {
          headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setPlaylistData(response.data);
    };
    getPlaylistData();
  }, [accessToken, playlistId]);
  return (
    <>
      {!user.display_name && (
        <Alert
          severity="error"
          sx={{ width: "50vh", margin: "auto", zIndex: 4 }}
        >
          <AlertTitle>Error</AlertTitle>
          Something went wrong —{" "}
          <h4>Either this is a connection issue or your token has expired.</h4>
          <br />
          <h4>
            It may also be possible that this account is not registered in the
            dashboard for this particular app. If the issue persists please send
            me a mail at{" "}
            <i>
              <a
                href="mailTo:ranjhaniharshal@gmail.com"
                style={{ color: "red" }}
              >
                ranjhaniharshal@gmail.com
              </a>
            </i>
          </h4>
          <br />
          <strong>Try logging out and logging back in!</strong>
        </Alert>
      )}
      {user.display_name && (
        <div style={{ display: "flex" }}>
          <div>
            <img
              style={{
                height: "200px",
                width: "200px",
                marginLeft: "80px",
                marginTop: "40px",
              }}
              src={
                playlistData?.images?.length
                  ? playlistData?.images[0]?.url
                  : "https://dannythomson.com/wp-content/uploads/2020/05/itunes-3.png"
              }
              alt="Not playing"
            ></img>
            <Typography variant="h2" pl={10} mt={5}>
              {playlistData?.name}
            </Typography>
            <div style={{ display: "flex" }}>
              <Typography variant="h6" pl={10}>
                by {playlistData?.owner?.display_name}
              </Typography>
              <Typography variant="h6" pl={10}>
                Followers : {followersFormat(playlistData?.followers?.total)}
              </Typography>
            </div>
          </div>
          <div>
            <div style={{ marginLeft: "50px" }}>
              <Typography variant="h2" pl={10}>
                Tracks
              </Typography>
              <List
                sx={{
                  width: "100%",
                  maxWidth: "90vw",
                  bgcolor: "transparent",
                  height: "90vh",
                  margin: "auto",
                  overflowY: "scroll",
                  padding: 0,
                  listStyle: "none",
                  "&::-webkit-scrollbar": {
                    width: "0.4em",
                  },
                  "&::-webkit-scrollbar-track": {
                    boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                    webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "rgba(0,0,0,.1)",
                    outline: "1px solid slategrey",
                  },
                }}
              >
                {playlistData?.tracks?.items?.map((track) => (
                  <ListItem
                    alignItems="flex-start"
                    sx={{ width: "40vw" }}
                    key={`${track?.track?.uri}-${Math.floor(
                      Math.random() * 1000
                    )}`}
                  >
                    <ListItemAvatar>
                      <Avatar
                        alt={track?.track?.name}
                        src={track?.track?.album?.images[2].url}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={track?.track?.name}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "flex", flexGrow: 1 }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {track?.track?.artists
                              .map((artist) => artist?.name)
                              .join(", ")}
                            {/* <Typography
                            variant="p"
                            style={{ marginLeft: "200px" }}
                          >
                            <Moment fromNow>{track.track.added_at}</Moment>
                          </Typography> */}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlaylistDetails;
