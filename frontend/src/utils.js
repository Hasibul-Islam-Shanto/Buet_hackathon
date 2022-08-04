import React, { useState } from "react";
import { ResultReason } from "microsoft-cognitiveservices-speech-sdk";
import axios from "axios";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import Button from "@mui/material/Button";
import TextToSpeech from "../components/TextToSpeech";
import { useSpeechSynthesis } from "react-speech-kit";
const speechsdk = require("microsoft-cognitiveservices-speech-sdk");
async function VoiceRec(){
// const [displayText, setDisplayText] = useState("");
const { speak } = useSpeechSynthesis();
var text = "";
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
  const recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);

//   setDisplayText("speak Now...");
  recognizer.recognizeOnceAsync((result) => {
    let displayText;
    if (result.reason === ResultReason.RecognizedSpeech) {
      displayText = `RECOGNIZED: Text=${result.text}`;
    } else {
      displayText =
        "ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly.";
    }
    console.log(result.text);
    text = result.text;
    // setDisplayText(displayText);
    console.log(text);
    if (text.toLowerCase().includes("song")) {
    //   console.log("yiiii");
      speak({ text: "Tell me your song name" });
    }
  });
}
}