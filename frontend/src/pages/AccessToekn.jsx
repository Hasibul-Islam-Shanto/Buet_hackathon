import { Box, Button } from "@mui/material";
import React from "react";
import { useState } from "react";
import { getAccesstoken } from "../Api/Api";

const AccessToekn = () => {
    const [token, setToken] = useState(null);
  const getToken = async () => {
    const res = await getAccesstoken();
    setToken(res.data.token)
  };
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Get your accesstoken</h1>
      <Button
        variant="contained"
        sx={{ textTransform: "capitalize", padding: ".5rem" }}
        onClick={getToken}
      >
        Get Access token
      </Button>
      <h4>Your access token - {token}</h4>
    </Box>
  );
};

export default AccessToekn;
