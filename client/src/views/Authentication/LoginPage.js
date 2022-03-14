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
  Typography,
} from "@mui/material";
import GoogleButton from "react-google-button";
import React, { useState } from "react";
import "./css/LoginPage.css";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "@firebase/auth";
import { UserState } from "../../contexts/UserContext";
import { GeneralState } from "../../contexts/GeneralContext";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../services/firebase";

const LoginPage = () => {
  const { automatedRocketChatSSO } = UserState();
  const { generateSnackbar } = GeneralState();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      // const profileStoreRef = doc(db, "userprofile", result.user.uid);
      // const profileStoreSnap = await getDoc(profileStoreRef);

      // if (profileStoreSnap.exists()) {
      //   automatedRocketChatSSO({
      //     username: profileStoreSnap.data().username,
      //     email: result.user.email,
      //     pass: result.user.uid,
      //     displayname: profileStoreSnap.data().username,
      //   });
      // }

      // automatedRocketChatSSO({
      //   username: username,
      //   email: result.user.email,
      //   pass: result.user.uid,
      //   displayname: username,
      // });

      generateSnackbar({
        newShow: true,
        newMessage: "Login Successful!",
        newType: "success",
      });

      navigate("/");
    } catch (error) {
      if (!!String(error.message).match("^Firebase:.*")) {
        generateSnackbar({
          newShow: true,
          newMessage: error.message.replace("Firebase: ", ""),
          newType: "error",
        });
      } else {
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
          newMessage: "Google Sign In Successful!",
          newType: "success",
        });
      })
      .catch((error) => {
        generateSnackbar({
          newShow: true,
          newMessage: "Google Sign In Failed",
          newType: "error",
        });
        console.log(error);
      });
  };

  return (
    <Box
      className="loginmainbox"
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        paddingTop: "80px",
        paddingBottom: "80px",
      }}
    >
      <Box
        className="loginresize"
        p={5}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          minWidth: "150px",
          maxWidth: "400px",
          backgroundColor: "#f5f6f7",
          borderRadius: "10px",
          boxShadow: "4px 6px 0px 0px #ECECEC",
        }}
      >
        <Box
          style={{
            display: "flex",
            paddingBottom: "10px",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            id="finallogo"
            alt=""
            src={process.env.PUBLIC_URL + "/finallogo.png"}
            style={{ width: "80px", height: "70px", paddingBottom: "5px" }}
          />
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
            It's TREX.
          </Typography>
        </Box>
        <TextField
          className="textfield"
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
          fullWidth
          style={{ backgroundColor: "white" }}
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
        <Box
          className="boxrememberforgot"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            //   justifyContent: "center",
          }}
        >
          <FormControlLabel
            style={{ color: "#999" }}
            control={<Checkbox />}
            label="Remember Me"
          />
          <Box
            className="labelforgotpassword"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              lineHeight: 2.5,
            }}
          >
            <a href="/forgotpswd" style={{ color: "#999" }}>
              Forgot Password?
            </a>
          </Box>
        </Box>
        <Button
          variant="contained"
          size="large"
          style={{
            backgroundColor: "#7BE495",
            color: "black",
            fontWeight: "bold",
            fontFamily: "League Spartan",
            fontSize: "1.2rem",
          }}
          onClick={handleSubmit}
        >
          Login
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
        <Box>
          <p
            className="noaccountsignup"
            style={{
              color: "#999",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            If account is not yet created,&nbsp;
            <a href="/signuppage" style={{ color: "#2666CF" }}>
              click here
            </a>
            &nbsp;to sign up.
          </p>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
