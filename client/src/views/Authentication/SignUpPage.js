import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  TextField,
  InputAdornment,
  IconButton,
  Container,
  Typography,
} from "@mui/material";
import GoogleButton from "react-google-button";
import React, { useState, useEffect } from "react";
import "./css/SignUpPage.css";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "@firebase/auth";
import { passwordVerify } from "../../utils/PasswordChecker";
import { checkUserNameExist } from "../../services/rocketchat";
import { GeneralState } from "../../contexts/GeneralContext";
import { auth, db } from "../../services/firebase";
import { doc, setDoc } from "@firebase/firestore";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { WatchListState } from "../../contexts/WatchListContext";

const SignUpPage = () => {
  const { dispatch } = WatchListState();
  const { generateSnackbar } = GeneralState();
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
  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState({ message: "" });

  useEffect(() => {
    console.log(errorMsg.message);
  }, [errorMsg]);

  const handleSubmit = async () => {
    try {
      const checkuser = await checkUserNameExist(username);

      if (!checkuser.error) {
        if (checkuser.result) {
          const error = {
            message: "Username already exist",
          };
          throw error;
        }
      } else if (checkuser.error) {
        const error = {
          message: checkuser.error,
        };
        throw error;
      }

      if (password !== confirmPassword) {
        const error = { message: "Password Mismatch" };
        throw error;
      }

      if (!passwordVerify(password)) {
        const error = {
          message:
            "Please ensure your password contains both Letter and Number",
        };
        throw error;
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

      const profileStoreRef = doc(db, "userprofile", result.user.uid);

      try {
        await setDoc(profileStoreRef, {
          username: username,
        });
      } catch (error) {
        const errormsg = {
          message: error.message,
        };
        throw errormsg;
      }

      // automatedRocketChatSSO({
      //   username: username,
      //   email: result.user.email,
      //   pass: result.user.uid,
      //   displayname: username,
      // });

      const userData = {
        user: result.user.uid,
        username: username,
        watchlist: {
          forex: [],
          crypto: [],
        },
      };
      // axios
      //   .post("http://localhost:5000/watchlist/adduser", userData)
      //   .then((response) => {
      //     console.log(response.status);
      //     console.log(response.data);
      //   });
      dispatch({ type: "CREATE_RECORD", payload: userData });

      generateSnackbar({
        newShow: true,
        newMessage: "Sign Up Successful!",
        newType: "success",
      });

      navigate("/");
    } catch (error) {
      if (!!String(error.message).match("^Firebase:.*")) {
        setErrorMsg((previousError) => ({
          ...previousError,
          message: error.message.replace("Firebase: ", ""),
        }));

        generateSnackbar({
          newShow: true,
          newMessage: error.message.replace("Firebase: ", ""),
          newType: "error",
        });
      } else {
        setErrorMsg((previousError) => ({
          ...previousError,
          message: error.message,
        }));

        generateSnackbar({
          newShow: true,
          newMessage: error.message,
          newType: "error",
        });
      }

      return;
    }
  };

  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        generateSnackbar({
          newShow: true,
          newMessage: "Google Sign Up Successful!",
          newType: "success",
        });
      })
      .catch((error) => {
        generateSnackbar({
          newShow: true,
          newMessage: "Google Sign Up Failed",
          newType: "error",
        });
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
              textAlign: "center",
            }}
          >
            The all in one seamless platform to help support your investment
            decisions.
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
                fontFamily: " League Spartan !important",
                color: "black",
                fontWeight: "bold !important",
              }}
            >
              Welcome
            </Typography>
            <Typography
              id=""
              variant="h4"
              // component="div"
              sx={{
                fontFamily: " League Spartan !important",
                color: "black",
                fontWeight: "bold !important",
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
