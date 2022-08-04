import React from "react";
import Box from "@mui/material/Box";
import SearchandMic from "../components/Home/SearchandMic";
const Home = () => {
  return (
    <>
      <Box
        sx={{
          height: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          //   justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SearchandMic />
      </Box>
    </>
  );
};

export default Home;
