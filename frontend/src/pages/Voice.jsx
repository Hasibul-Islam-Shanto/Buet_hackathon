import React, { useState , useEffect} from "react";
import { ResultReason } from "microsoft-cognitiveservices-speech-sdk";
import axios from "axios";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import Button from "@mui/material/Button";
import TextToSpeech from "../components/TextToSpeech";
import { useSpeechSynthesis } from "react-speech-kit";
import { useNavigate } from "react-router-dom";

const speechsdk = require("microsoft-cognitiveservices-speech-sdk");

const Voice = ({ setSearchText }) => {
  const [displayText, setDisplayText] = useState("");
  const [type, setType] = useState("")
  const { speak } = useSpeechSynthesis();
    const [latLot, setLatLot] = useState(null);

  const navigate = useNavigate();
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
      console.log(result.text);
      text = result.text;
      setDisplayText(displayText);
      console.log(text);
      if (text.toLowerCase().includes("song")) {
        console.log("yiiii");
        speak({ text: "Tell me your song name" });
        setType("song")
      }
      else if (text.toLowerCase().includes("search")){
          console.log("yiiii");
          speak({ text: "Tell me what you want to search" });
          setType("search");
      }
        if (type === "song") {
          navigate(`/music?q=${text}`);
        }
        if(type === "search"){
          navigate(`/search?q=${text}`);
        }
       if (text.toLowerCase().includes("news")) {
         navigate(`/news?lat=${latLot.lat}&lot=${latLot.lot}`);
       }
    });
  }

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

  return (
    <>
      <Button variant="containted" onClick={() => getTextFromMic()}>
        <KeyboardVoiceIcon />
      </Button>
      <div>{displayText}</div>
    </>
  );
};

export default Voice;
