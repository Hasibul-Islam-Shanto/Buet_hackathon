import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};
const clientId =
  "741049751294-5u9dhstnsuh9bs5kjse7aukvhf5ni0tr.apps.googleusercontent.com";
export default function RegisterModal(props) {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (res) => {
    console.log(res);
  };

  const handleFailure = (e) => {
    console.log(e);
  };
  // mail change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  // password change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      email: email,
      password: password,
    };
    props.handleClose(false);

    await axios
      .post("http://localhost:4000/api/user", newUser)
      .then(function (res) {
        console.log(newUser);
        console.log(res);
      })
      .catch(function (e) {
        console.log(e);
      });
    setEmail("");
    setPassword("");
  };

  return (
    <Modal
      open={props.open}
      onClose={() => {
        props.handleClose(false);
      }}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'>
      <form onSubmit={submitHandler}>
        <Stack direction='column' spacing={4} sx={style}>
          <Typography variant='h6' sx={{ textAlign: "center" }}>
            SignUp
          </Typography>
          <TextField
            id='filled-basic'
            label='Email'
            type='text'
            value={email}
            onChange={handleEmailChange}
          />
          <TextField
            id='filled-basic'
            label='Password'
            type='password'
            value={password}
            onChange={handlePasswordChange}
          />
          <Button variant='contained' type='submit'>
            Submit
          </Button>
          or
          <GoogleLogin
            clientId={clientId}
            buttonText='Sign Up with Google'
            onSuccess={handleLogin}
            onFailure={handleFailure}
            cookiePolicy='single_host_origin'
          />
        </Stack>
      </form>
    </Modal>
  );
}
