import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  TextField,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
  Avatar,
  Container,
  Typography,
} from "@mui/material";
import GoogleButton from "react-google-button";
import React, { useState, useEffect } from "react";
import "./css/SignUpPage.css";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "@firebase/auth";
import { passwordVerify } from "../../utils/PasswordChecker";
import { rocketChatSSO, checkUserNameExist } from "../../services/rocketchat";
import { UserState } from "../../contexts/UserContext";
import { auth } from "../../services/firebase";

const SignUpPage = () => {
  const { automatedRocketChatSSO } = UserState();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const handleClickShowPassword2 = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const handleMouseDownPassword2 = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const [errorMsg, setErrorMsg] = useState({ message: "" });

  useEffect(() => {
    console.log(errorMsg.message);
  }, [errorMsg]);

  const handleSubmit = async () => {
    try {
      // const checkuser = await checkUserNameExist(username);

      // if (!checkuser.error) {
      //   if (checkuser.result) {
      //     throw {
      //       message: "Username already exist",
      //     };
      //   }
      // } else if (checkuser.error) {
      //   throw {
      //     message: checkuser.error,
      //   };
      // }

      if (password != confirmPassword) {
        throw { message: "Password Mismatch" };
      }

      if (!passwordVerify(password)) {
        throw {
          message:
            "Please ensure your password contains both Letter and Number",
        };
      }

      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (result.user.emailVerified === false) {
        sendEmailVerification(result.user);
      }

      console.log(result.user);

      // automatedRocketChatSSO({
      //   username: username,
      //   email: result.user.email,
      //   pass: result.user.uid,
      //   displayname: username,
      // });

      console.log("Sign Up Success");
    } catch (error) {
      if (!!String(error.message).match("^Firebase:.*")) {
        setErrorMsg((previousError) => ({
          ...previousError,
          message: error.message.replace("Firebase: ", ""),
        }));
      } else {
        setErrorMsg((previousError) => ({
          ...previousError,
          message: error.message,
        }));
      }

      return;
    }
  };

  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        console.log("Google Provider Login Success");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box
      className="signupmainbox"
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        paddingTop: "80px",
        paddingBottom: "80px",
      }}
    >
      <Container
        className="signupcontainer"
        style={{
          display: "flex",
          flexDirection: "columnn",
          justifyContent: "space-between",
          alignItems: "center",
          minWidth: "300px",
          width: "100%",
          height: "100%",
          padding: "20px",
          paddingRight: "20px",
          paddingBottom: "20px",
        }}
      >
        <Box
          className="logotextbox"
          style={{
            display: "none",
            flexDirection: "column",
            gap: "20px",
            minWidth: "280px",
            maxWidth: "400px",
            minHeight: "400px",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <img
            id="finallogo"
            alt=""
            src={process.env.PUBLIC_URL + "/finallogo.png"}
            style={{ width: "400px", height: "330px", paddingBottom: "5px" }}
          />
          <Typography
            id=""
            variant="h6"
            // component="div"
            sx={{
              fontFamily: "Bree Serif !important",
              color: "white",
              textAlign: "justify",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
            doeiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
            ut aliquip ex ea commodo consequat.
          </Typography>
        </Box>
        <Box
          className="signupresize"
          p={5}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            minWidth: "200px",
            maxWidth: "400px",
            maxHeight: "500px",
            backgroundColor: "#f5f6f7",
            borderRadius: "10px",
            boxShadow: "4px 6px 0px 0px #ECECEC",
          }}
        >
          <Box
            style={{
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingBottom: "10px",
              marginTop: "-20px",
              fontFamily: "League Spartan",
            }}
          >
            <Typography
              id=""
              variant="h4"
              // component="div"
              sx={{
                fontFamily: " League Spartan",
                color: "black",
                fontWeight: "bold",
              }}
            >
              Welcome
            </Typography>
            <Typography
              id=""
              variant="h4"
              // component="div"
              sx={{
                fontFamily: " League Spartan",
                color: "black",
                fontWeight: "bold",
              }}
            >
              to TREX
            </Typography>
          </Box>
          <TextField
            required
            id="outlined-required"
            label="Username"
            placeholder="Enter your username"
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ backgroundColor: "white" }}
            fullWidth
          />
          <TextField
            required
            id="outlined-required"
            label="Email"
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ backgroundColor: "white" }}
            fullWidth
          />
          <TextField
            required
            id="outlined-required"
            label="Password"
            placeholder="Enter your password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ backgroundColor: "white" }}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            required
            id="outlined-required"
            label="Confirm Password"
            placeholder="Confirm your password"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ backgroundColor: "white" }}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword2}
                    onMouseDown={handleMouseDownPassword2}
                  >
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="contained"
            size="large"
            style={{
              backgroundColor: "#7BE495",
              color: "black",
              fontWeight: "bold",
            }}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <Divider
            style={{
              color: "#999",
              paddingBottom: 10,
              paddingTop: 10,
              fontSize: 20,
            }}
          >
            or
          </Divider>
          <Box
            style={{
              paddingRight: 50,
              paddingLeft: 50,
              paddingTop: 0,
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <GoogleButton
                style={{
                  minWidth: 50,
                  outline: "none",
                  width: "100%",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
                onClick={signInWithGoogle}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SignUpPage;
