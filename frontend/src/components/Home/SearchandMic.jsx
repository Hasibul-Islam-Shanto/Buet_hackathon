import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MicIcon from "@mui/icons-material/Mic";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const SearchandMic = () => {
  const [searchText, setSearchText] = useState("");
    const {
      transcript,
      listening,
      resetTranscript,
      browserSupportsSpeechRecognition,
    } = useSpeechRecognition();

    const startListening = () =>{
      SpeechRecognition.startListening({continuous:true})
      console.log("Starts")
    }
  return (
    <>
      <Box
        sx={{
          width: "40%",
          height: "5vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          //   bgcolor:"gray",
          marginTop: "4rem",
        }}
      >
        <TextField
          label="Search"
          size="small"
          fullWidth
          onChange={(e) => setSearchText(e.target.value)}
        />
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
      </Box>
      <Box>
        <h1>{transcript}</h1>
      </Box>

    </>
  );
};

export default SearchandMic;
