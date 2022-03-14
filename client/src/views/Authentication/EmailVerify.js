import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { auth } from "../../services/firebase";
import { applyActionCode } from "@firebase/auth";
import { ArrowBackSharp, MailOutlineSharp } from "@mui/icons-material";
import { Button, Box } from "@mui/material";

const EmailVerify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const resetCode = searchParams.get("oobCode");

  const handleVerify = async () => {
    console.log(resetCode);
    try {
      const result = await applyActionCode(auth, resetCode);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleVerify();
  }, []);

  return (
    <Box
      className="emailverifiedmainbox"
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
            background: "#DEECFF",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
          }}
        >
          <MailOutlineSharp fontSize="large" style={{ color: "#051367" }} />
        </Box>
        <h1>Email Verified!</h1>
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
  );
};

export default EmailVerify;
