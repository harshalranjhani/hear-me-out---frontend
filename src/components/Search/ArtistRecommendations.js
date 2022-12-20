import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import axios from "axios";
import { LyricsSharp } from "@mui/icons-material";
import AssistantIcon from "@mui/icons-material/Assistant";

export default function ArtistRecommendations({ recommendationData }) {
  const currentTrack = useSelector((state) => state.tracks.currentTrack);
  const [lyrics, setLyrics] = React.useState("");
  // console.log(currentTrack);

  React.useEffect(() => {
    if (!currentTrack.item) return;
    axios
      .get("https://hear-me-out-backend.vercel.app/", {
        params: {
          title: currentTrack.item.name,
          artist: currentTrack.item.artists[0].name,
        },
      })
      .then((res) =>
        res.data.lyrics ? setLyrics(res.data.lyrics) : setLyrics("Not found")
      )
      .catch((e) => console.log(e));
  }, [currentTrack.item]);

  return (
    <>
      {recommendationData.tracks && (
        <div
          style={{
            display: "flex",
            width: "90vw",
            overflowY: "scroll",
          }}
        >
          <div>
            <Typography variant="h6" pl={2}>
              <AssistantIcon></AssistantIcon>More Like "{currentTrack.item.name}
              "
            </Typography>
            <List
              sx={{
                width: "100%",
                maxWidth: "90vw",
                bgcolor: "transparent",
                height: "50vh",
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
              {recommendationData.tracks.length &&
                recommendationData.tracks.map((track) => (
                  <ListItem
                    alignItems="flex-start"
                    sx={{ width: "40vw" }}
                    key={track.uri}
                  >
                    <ListItemAvatar>
                      {track.album.images.length && (
                        <Avatar
                          alt={track.name}
                          src={track.album.images[2].url || ""}
                        />
                      )}
                      {!track.album && (
                        <Avatar alt={"Not Found"} src={"Not Found"} />
                      )}
                    </ListItemAvatar>
                    <ListItemText
                      primary={track.name}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {track.artists
                              .map((artist) => artist.name)
                              .join(", ")}
                          </Typography>
                          {/* {" — I'll be in your neighborhood doing errands this…"} */}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                ))}
              {!recommendationData.tracks.length && (
                <ListItem alignItems="flex-start" sx={{ width: "40vw" }}>
                  No data found.
                </ListItem>
              )}
            </List>
          </div>
          <div
            style={{
              width: "90vw",
              overflowY: "scroll",
            }}
          >
            <Typography
              style={{ width: "30vw", textAlign: "center" }}
              variant="h6"
            >
              <LyricsSharp></LyricsSharp>LYRICS
            </Typography>
            <div
              style={{ height: "50vh", margin: "auto", overflowY: "scroll" }}
            >
              <Typography variant="p" style={{ whiteSpace: "pre-line" }}>
                {lyrics}
              </Typography>
            </div>
          </div>
        </div>
      )}
      {!recommendationData && <></>}
    </>
  );
}
