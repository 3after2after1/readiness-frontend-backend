import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import {
  ArrowBackSharp,
  LockResetOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import { useSearchParams } from "react-router-dom";
import { auth } from "../../services/firebase";
import { useNavigate } from "react-router-dom";

const SetNewPassword = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const resetCode = searchParams.get("oobCode");
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

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      console.log("Password does not match");
      return;
    } else {
      await verifyPasswordResetCode(auth, resetCode)
        .then((email) => {
          //const accountEmail = email;
          console.log(email);

          // Save the new password.
          confirmPasswordReset(auth, resetCode, password)
            .then((resp) => {
              console.log(resp);
              navigate("/successfulpasswordchange");
            })
            .catch((error) => {
              console.log("reset password failed");
            });
        })
        .catch((error) => {
          console.log("something wrong with link");
        });
    }
  };

  return (
    <>
      <Box
        className="newpasswordmainbox"
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
            width: "100%",
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
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              minWidth: "150px",
              maxWidth: "400px",
              width: "100%",
            }}
          >
            <h2>Set new password</h2>
            <span
              style={{ color: "#6a6a6a", textAlign: "center", width: "80%" }}
            >
              Your new password must be different to previous passwords
            </span>
          </Box>
          <Box
            style={{
              padding: "1.5rem 1.5rem 0.5rem 1.5rem",
              minWidth: "150px",
              maxWidth: "400px",
              width: "100%",
            }}
          >
            <TextField
              required
              id="outlined-required"
              label="Password"
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          </Box>
          <Box
            style={{
              padding: "0 0.5rem 0.5rem 0.5rem",
              fontSize: "0.8rem",
              minWidth: "150px",
              maxWidth: "400px",
              width: "100%",
            }}
          >
            <span style={{ color: "#999" }}>Minimum of 6 characters</span>
          </Box>
          <Box
            style={{
              minWidth: "150px",
              maxWidth: "400px",
              width: "100%",
            }}
            p={2}
          >
            <TextField
              required
              id="outlined-required"
              label="Confirm Password"
              placeholder="Confirm your password"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
          </Box>
          <Box
            style={{
              padding: "8px 24px 0 24px",
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

export default SetNewPassword;
