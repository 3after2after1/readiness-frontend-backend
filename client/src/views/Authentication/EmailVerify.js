import React from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { auth } from "../../services/firebase";
import { applyActionCode } from "@firebase/auth";
import { ArrowBackSharp } from "@mui/icons-material";
import { Button } from "@mui/material";

const EmailVerify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const resetCode = searchParams.get("oobCode");

  const navigate = useNavigate();

  const handleVerify = async () => {
    console.log(resetCode);
    try {
      const result = await applyActionCode(auth, resetCode);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    handleVerify();
  }, []);

  return (
    <div>
      <h1>emailVerified</h1>
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
    </div>
  );
};

export default EmailVerify;
