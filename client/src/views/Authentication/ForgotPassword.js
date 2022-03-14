import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { ArrowBackSharp, LockResetOutlined } from "@mui/icons-material";
import { auth } from "../../services/firebase";
import { sendPasswordResetEmail } from "@firebase/auth";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const handleSubmit = async () => {
    try {
      // const result = await sendPasswordResetEmail(auth, email, {
      //   url: "http://localhost:3001/resetpswd",
      //   handleCodeInApp: true,
      // });
      const result = await sendPasswordResetEmail(auth, email);

      console.log("Password reset trigger");
      navigate("/checkemail", { state: { resetEmail: email } });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box
        className="forgotpasswordmainbox"
        style={{
          display: "flex",
          width: "100%",
          minHeight: "400px",
          justifyContent: "center",
          paddingTop: "80px",
          paddingBottom: "80px",
        }}
      >
        <Box
          p={3}
          style={{
            //width: "100%",
            minWidth: "150px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#F3F8FF",
              borderRadius: "50%",
              width: "60px",
              height: "60px",
            }}
          >
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#DEECFF",
                borderRadius: "50%",
                width: "50px",
                height: "50px",
              }}
            >
              <LockResetOutlined
                fontSize="large"
                style={{ color: "#051367" }}
              />
            </Box>
          </Box>
          <h2>Forgot password?</h2>
          <span style={{ color: "#6a6a6a" }}>
            We will send you instructions to reset your password
          </span>
          <Box
            style={{
              minWidth: "150px",
              maxWidth: "400px",
              width: "100%",
            }}
            p={3}
          >
            <TextField
              required
              id="outlined-required"
              label="Email"
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
          </Box>
          <Box
            style={{
              minWidth: "150px",
              maxWidth: "400px",
              width: "100%",
            }}
          >
            <Button
              variant="contained"
              size="large"
              style={{ backgroundColor: "#0d47a1", fontWeight: "bold" }}
              onClick={handleSubmit}
              fullWidth
            >
              Reset Password
            </Button>
          </Box>
          <Box p={3}>
            <Button
              variant="text"
              href="/"
              startIcon={<ArrowBackSharp />}
              style={{
                color: "#999",
              }}
            >
              Back to Home
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ForgotPassword;
