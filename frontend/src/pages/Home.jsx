
import React, { useState } from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Stack,
  Button,
  Divider,
  Box,
  CardContent,
} from "@mui/material";
import { styled } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";
import RegisterModal from "../component/RegisterModal/RegisterModal";
import LoginModal from "../component/RegisterModal/LoginModal";
import Card from "../component/RegisterModal/Card";
import { Link } from "react-router-dom";
import Voice from "./Voice";

const CustomButton = styled("button")({
  variant: "text",
  color: "#0C214C",
  fontWeight: "bold",
  fontFamily: "Roboto",
  fontSize: "15px",
  border: "none",
  backgroundColor: "#C4D6FC",
  cursor: "pointer",
  borderRadius: "15px",
  width: "100px",
  height: "40px",
});

const NormalButton = styled("button")({
  variant: "text",
  color: "#0C214C",
  fontWeight: "bold",
  fontFamily: "Roboto",
  fontSize: "15px",
  border: "none",
  cursor: "pointer",
  backgroundColor: "inherit",
});

const Home = () => {
  const [Modal, setModalOpen] = useState(false);
  const [signInModal, setsignInModalOpen] = useState(false);
  const [type, setType] = useState("");

  const signUpHandler = () => {
    setType("signUp");
    setModalOpen(true);
  };
  const signInHandler = () => {
    console.log("yoooooo");
    setsignInModalOpen(true);
  };
  return (
    <>
      <AppBar sx={{ background: "transparent", boxShadow: "none" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Stack direction="row">
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                color: "#195DF8",
                fontFamily: "futura",
                fontWeight: "bold",

              }}>
             MyApp

             
            </Typography>
          </Stack>

          <Stack direction="row" spacing={4}>
            <NormalButton>
              <Voice/>
            </NormalButton>
            <NormalButton>
              <Link to="/music" style={{ textDecoration: "none" }}>
                Musics
              </Link>
            </NormalButton>
            <NormalButton>
              <Link to="/news" style={{ textDecoration: "none" }}>
                News
              </Link>
            </NormalButton>
            <CustomButton onClick={signInHandler}>SignIn</CustomButton>
            <CustomButton onClick={signUpHandler}>SignUp</CustomButton>
          </Stack>
        </Toolbar>
      </AppBar>
      {Modal && <RegisterModal open={Modal} handleClose={setModalOpen} />}
      {signInModal && (
        <LoginModal open={signInModal} handleClose={setsignInModalOpen} />
      )}
      {/* <Divider />
      <Stack direction='row' sx={{ height: "700px" }}>
        <Typography
          variant='h2'
          sx={{
            fontWeight: "bold",
            fontFamily: "Product Sans",
            alignItems: "Center",
          }}>
          A assistant to find
        </Typography>
        <img src='/voice-assistant-animate.svg' width='600px'></img>
      </Stack> */}
      <Stack
        direction="row"
        component="main"
        sx={{
          backgroundColor: "transparent",
          height: "700px",
          width: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h3"
          component="div"
          sx={{
            color: "black",
            fontFamily: "futura",
            fontWeight: "bold",
            marginX: "50px",
            width: "500px",
          }}
        >
          Find your assistant
          <p style={{ color: "#195DF8", margin: "0px", padding: "0px" }}>
            at your home
          </p>
        </Typography>

        <img src="voice.gif" height="500px" alt="your image" />
      </Stack>
      <Typography
        variant="h5"
        sx={{
          color: "#0C214C",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        About Our App
      </Typography>
      <Stack
        direction="row"
        spacing={4}
        sx={{
          backgroundColor: "#F2F9F6",
          margin: "40px",
          padding: "20px",
          borderRadius: "15px",
        }}
      >
        {/* <Card
          title='Search your favorite music by voice command'
          icon='Music'
        />
        <Card title='Search News by voice command' icon='News' />
        <Card title='Search easiest route by command' icon='Map' />
        <Card title='Search anything' icon='Search' /> */}
      </Stack>

      {/* <Box
        sx={{
          height: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          //   justifyContent: "center",
          alignItems: "center",
        }}
      >
      </Box> */}
    </>
  );
};


export default Home;
