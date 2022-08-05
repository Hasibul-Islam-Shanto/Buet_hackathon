import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Music from "./pages/Music";
import News from "./pages/News";
import Voice from "./pages/Voice";
import AuthContext from "./context/AuthProvider";
const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/music' element={<Music />} />
        <Route path='/news' element={<News />} />
        <Route path='/voice' element={<Voice />} />
      </Routes>
    </>
  );
};

export default App;
