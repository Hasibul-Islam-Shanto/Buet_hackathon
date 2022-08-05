import { Box, Card } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Musics } from "../Api/Api";
import { useSearchParams } from "react-router-dom";

const Music = () => {
  const [songs, setSongs] = useState([]);
  const [searchParams] = useSearchParams();
  const text = searchParams.get("q");
  console.log(text);
  useEffect(() => {
    // get search musics
    const GetSongs = async () => {
      const res = await Musics(text);
      setSongs(res.data);
      console.log(res);
      // window.location.replace(res.data.external_urls.spotify);
    };
    GetSongs();
  }, []);
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "50%",
            padding: "2rem",
          }}
        >
          {songs.map((song, i) => (
            <Card
              sx={{
                width: "100%",
                padding: ".5rem 1rem",
                marginTop: "1rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                ":hover": {
                  transform: "scale(1.05)",
                  bgcolor: "rgba(0,0,0,.02)",
                  transition: ".3s ease-out",
                },
              }}
              onClick={() => {
                window.location.replace(song.external_urls.spotify);
              }}
              key={i}
            >
              <img
                src={song.album.images[0].url}
                alt=""
                style={{ height: "60px", width: "60px", borderRadius: "50%" }}
              />
              <span>{song.name}</span>
              <span>{song.album.artists[0].name}</span>
              <span>
                {parseFloat(song.duration_ms / (1000 * 60)).toPrecision(3)}s
              </span>
            </Card>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Music;
