import React from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import { useNavigate } from "react-router-dom";

const TextToSpeech = ({ searchText }) => {
  const navigate = useNavigate();
  console.log(searchText);
  const { speak } = useSpeechSynthesis();

  if (searchText.toLowerCase().includes("song")) {
    speak({ text: "Tell me your song name" });
    return;
  }
  
  if (!searchText.toLowerCase().includes("song")){
    navigate("/music")
  } return <></>;
};

export default TextToSpeech;
