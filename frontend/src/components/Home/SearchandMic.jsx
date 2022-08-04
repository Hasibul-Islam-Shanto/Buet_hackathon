import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MicIcon from "@mui/icons-material/Mic";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Tooltip from "@mui/material/Tooltip";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useSpeechSynthesis } from "react-speech-kit";
import { Button, MenuItem } from "@mui/material";
import { Music, TopNews } from "../../Api/Api";
import { useEffect } from "react";

const SearchandMic = () => {
  const [searchText, setSearchText] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [news, setNews] = useState([])
  const { speak } = useSpeechSynthesis();
  const [latLot, setLatLot] = useState(null);
  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(pos) {
      const crd = pos.coords;
      console.log("Your current position is:");
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
      setLatLot({
        lat: crd.latitude,
        lot: crd.longitude,
      });
    }
    function error(err) {
      console.warn("Error");
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);
  const { transcript } = useSpeechRecognition();

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true });
    console.log("Starts");
  };


  //Get latest news..
  const getNews = async () => {
    const res = await TopNews(latLot);
    setNews(res.data.articles)
    console.log(res.data.articles);
  };
  return (
    <>
      <Box
        sx={{
          width: "50%",
          height: "5vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          //   bgcolor:"gray",
          marginTop: "4rem",
        }}
      >
        {selectValue !== "Response" && (
          <>
            <TextField
              label="Search"
              size="small"
              fullWidth
              onChange={(e) => setSearchText(e.target.value)}
            />
          </>
        )}

        {selectValue === "Response" && (
          <>
            <Box>
              <h3>Tell something by clicking the Mic</h3>
            </Box>
            <Tooltip
              title="Search by command...."
              arrow
              sx={{
                fontSize: "1rem",
                padding: "1rem",
              }}
            >
              <IconButton
                sx={{
                  marginLeft: ".5rem",
                }}
                onClick={startListening}
              >
                <MicIcon sx={{ fontSize: "2rem" }} />
              </IconButton>
            </Tooltip>
          </>
        )}
        {selectValue === "Speech to text" && (
          <Tooltip
            title="Search by command...."
            arrow
            sx={{
              fontSize: "1rem",
              padding: "1rem",
            }}
          >
            <IconButton
              sx={{
                marginLeft: ".5rem",
              }}
              onClick={startListening}
            >
              <MicIcon sx={{ fontSize: "2rem" }} />
            </IconButton>
          </Tooltip>
        )}
          <Tooltip
            title="Listen what saying..."
            arrow
            sx={{
              fontSize: "1rem",
              padding: "1rem",
            }}
          >
            <IconButton
              sx={{
                marginLeft: ".5rem",
              }}
              onClick={() => speak({ text: news.map((ne)=>(ne.source.title)) })}
            >
              <VolumeUpIcon sx={{ fontSize: "2rem" }} />
            </IconButton>
          </Tooltip>
        <TextField
          label="Options"
          size="small"
          variant="outlined"
          select
          value={selectValue}
          onChange={(e) => setSelectValue(e.target.value)}
          sx={{ width: "200px", marginLeft: "1rem" }}
        >
          <MenuItem value="Response">Response</MenuItem>
          <MenuItem value="Spect to text">Speect to Text</MenuItem>
          <MenuItem value="Text to speech">Text to Speect</MenuItem>
          <MenuItem value="Musics">Musics</MenuItem>
          <MenuItem value="News">News</MenuItem>
        </TextField>
      </Box>
      <Button onClick={getNews}>getNews</Button>
      <Box>
        <h1>{transcript}</h1>
      </Box>
      <Box>
        {
          news.map((ne)=>(
            <>
            <h3>{ne.source.title}</h3>
            </>
          ))
        }
      </Box>
    </>
  );
};

export default SearchandMic;
