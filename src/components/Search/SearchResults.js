import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

export default function SearchResults({ searchData }) {
  return (
    <>
      <div
        style={{
          display: "flex",
          width: "90vw",
          overflowY: "scroll",
        }}
      >
        <div>
          <Typography variant="h2" pl={10}>
            Tracks
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
            {searchData.tracks.items.length &&
              searchData.tracks.items.map((track) => (
                <ListItem
                  alignItems="flex-start"
                  sx={{ width: "40vw" }}
                  key={track.uri}
                >
                  <ListItemAvatar>
                    <Avatar alt={track.name} src={track.album.images[2].url} />
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
            {!searchData.albums.items.length && (
              <ListItem alignItems="flex-start" sx={{ width: "40vw" }}>
                No data found.
              </ListItem>
            )}
          </List>
        </div>
        <div>
          <Typography variant="h2" pl={10}>
            Albums
          </Typography>
          {searchData.albums.items.length && (
            <List
              sx={{
                width: "100%",
                maxWidth: "40vw",
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
              {searchData.albums.items.map((album) => (
                <ListItem
                  alignItems="flex-start"
                  sx={{ width: "30vw" }}
                  key={album.uri}
                >
                  <ListItemAvatar>
                    <Avatar alt={album.name} src={album.images[2].url} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={album.name}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {album.artists
                            .map((artist) => artist.name)
                            .join(", ")}
                        </Typography>
                        {`- ${album.album_type}`}
                      </React.Fragment>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
          {!searchData.albums.items.length && (
            <Typography alignItems="flex-start" sx={{ width: "40vw" }}>
              No data found.
            </Typography>
          )}
        </div>
      </div>
    </>
  );
}
