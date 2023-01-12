import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";

const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const [artistData, setArtistData] = useState([]);
  const accessToken = useSelector((state) => state.auth.accessToken);

  function followersFormat(num) {
    return num?.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  useEffect(() => {
    const getArtistData = async () => {
      const response = await axios.get(
        `https://api.spotify.com/v1/artists/${artistId}`,
        {
          headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setArtistData(response.data);
    };
    getArtistData();
  }, [accessToken, artistId]);
  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <img
              style={{
                height: "200px",
                width: "200px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "40px",
              }}
              src={
                artistData?.images?.length
                  ? artistData?.images[0]?.url
                  : "https://dannythomson.com/wp-content/uploads/2020/05/itunes-3.png"
              }
              alt="Not playing"
            ></img>
            <Typography variant="h2" mt={5}>
              {artistData?.name}
            </Typography>

            <Typography variant="h6" sx={{ textAlign: "center" }} mt={5}>
              Followers : {followersFormat(artistData?.followers?.total)}
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtistDetails;
