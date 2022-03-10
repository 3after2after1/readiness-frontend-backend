import { ArrowBackSharp, MailOutlineSharp } from "@mui/icons-material";
import React from "react";
import { Box, Button } from "@mui/material";
import { useLocation } from "react-router-dom";

const CheckEmailPage = () => {
  const location = useLocation();

  return (
    <>
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
            <MailOutlineSharp fontSize="large" style={{ color: "#051367" }} />
          </Box>
        </Box>
        <h1>Check your email</h1>
        <span
          style={{
            color: "#6a6a6a",
            paddingBottom: "0.5rem",
            paddingTop: "0.5rem",
          }}
        >
          We sent the password reset link to
        </span>
        <span
          style={{
            color: "#0d47a1",
            paddingBottom: "1.5rem",
            fontSize: "1.3rem",
            fontWeight: "bold",
          }}
        >
          {location.state.resetEmail}
        </span>
        <span style={{ color: "#6a6a6a", fontSize: "0.85rem" }}>
          {" "}
          Didn't receive the email?{"  "}
          <a
            href="/forgotpswd"
            style={{ color: "#293A80", textDecoration: "none" }}
          >
            Click to retry
          </a>
        </span>
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
    </>
  );
};

export default CheckEmailPage;
