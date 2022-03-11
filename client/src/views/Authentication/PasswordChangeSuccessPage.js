import {
  ArrowBackSharp,
  CheckCircleOutlineSharp,
  MailOutlineSharp,
} from "@mui/icons-material";
import React from "react";
import { Box, Button, TextField } from "@mui/material";

const PasswordChangeSuccessPage = () => {
  return (
    <>
      <Box
        className="passwordchangesuccessmainbox"
        style={{
          display: "flex",
          width: "100%",
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
              background: "#f2fff6",
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
                background: "#dafee6",
                borderRadius: "50%",
                width: "50px",
                height: "50px",
              }}
            >
              <CheckCircleOutlineSharp
                fontSize="large"
                style={{ color: "#68ff99" }}
              />
            </Box>
          </Box>
          <h1>Password reset</h1>
          <span
            style={{
              color: "#6a6a6a",
              paddingBottom: "0.5rem",
              paddingTop: "0.5rem",
              textAlign: "center",
            }}
          >
            Your password has been successfully reset.
          </span>
          <span
            style={{
              color: "#6a6a6a",
              paddingBottom: "1.5rem",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Click below to continue.
          </span>
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
              style={{ backgroundColor: "#00bb3d", fontWeight: "bold" }}
              href="/"
              fullWidth
            >
              Return to Home
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PasswordChangeSuccessPage;
