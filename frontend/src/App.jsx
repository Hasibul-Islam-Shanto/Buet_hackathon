import React from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
// import TextToSpeech from "./components/TextToSpeech";
import Home from "./pages/Home";
import Music from "./pages/Music";
import News from "./pages/News";
import SearchPages from "./pages/SearchPages";
import Voice from "./pages/Voice";
import Map from "./pages/Map";
const App = () => {
  //console.log(searchText);
  const [searchText, setSearchText] = useState("")
  return (
    <>
      {/* <TextToSpeech searchText={searchText} /> */}
      {/* <Voice setSearchText={setSearchText} /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route
          path="/voice"
          element={<Voice setSearchText={setSearchText} />}
        /> */}
        <Route path="/music" element={<Music searchText={searchText} />} />
        <Route path="/news" element={<News />} />
        <Route path="/search" element={<SearchPages />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </>
  );
};

export default App;
