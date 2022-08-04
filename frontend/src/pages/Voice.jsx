import React, { useState } from "react";
import { ResultReason } from "microsoft-cognitiveservices-speech-sdk";
import axios from "axios";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import Button from "@mui/material/Button";
const speechsdk = require("microsoft-cognitiveservices-speech-sdk");

const Home = () => {
  const [displayText, setDisplayText] = useState("");

  async function getTextFromMic() {
    const response = await axios.get("http://localhost:4000/api/speechtotext");
    console.log(response.data.token, response.data.location);
    const token = response.data.token;
    const region = response.data.location;
    const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(
      token,
      region
    );
    speechConfig.speechRecognitionLanguage = "en-US";
    const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new speechsdk.SpeechRecognizer(
      speechConfig,
      audioConfig
    );
    setDisplayText("speak Now...");
    recognizer.recognizeOnceAsync((result) => {
      let displayText;
      if (result.reason === ResultReason.RecognizedSpeech) {
        displayText = `RECOGNIZED: Text=${result.text}`;
      } else {
        displayText =
          "ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly.";
      }
      console.log(displayText);
      setDisplayText(displayText);
    });
  }
  return (
    <>
      <h1>Home page..</h1>

      <Button variant='containted' onClick={() => getTextFromMic()}>
        <KeyboardVoiceIcon></KeyboardVoiceIcon>
      </Button>
      <h1>{displayText}</h1>
    </>
  );
};

export default Home;
