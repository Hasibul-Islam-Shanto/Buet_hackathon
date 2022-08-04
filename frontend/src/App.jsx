import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Music from "./pages/Music";
import News from "./pages/News";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/music" element={<Music />} />
        <Route path="/news" element={<News />} />
      </Routes>
    </>
  );
};

export default App;
