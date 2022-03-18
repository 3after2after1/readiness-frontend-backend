import React, { useState } from "react";
import { Box, Button } from "@material-ui/core";
import ChatWindow from "../../ChatWindow";
import { TextField } from "@mui/material";
import { UserState } from "../../../contexts/UserContext";
import { checkUserNameExist } from "../../../services/rocketchat";
import { db } from "../../../services/firebase";
import { doc, setDoc } from "@firebase/firestore";
import { GeneralState } from "../../../contexts/GeneralContext";

export default function DetailsComment() {
  const { username, user, userRocketChatToken } = UserState();
  const { generateSnackbar } = GeneralState();
  const [newusername, setNewUsername] = useState("");

  const handleSubmit = async () => {
    if (username === null) {
      try {
        const checkuser = await checkUserNameExist(newusername);

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

        const profileStoreRef = doc(db, "userprofile", user.uid);

        try {
          await setDoc(profileStoreRef, {
            username: newusername,
          });
        } catch (error) {
          const errormsg = {
            message: error.message,
          };
          throw errormsg;
        }

        return;
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
    }
  };

  const noUserName = () => {
    return (
      <div
        style={{
          width: "100%",
          padding: "10px",
        }}
      >
        <div>
          <h2 style={{ marginBottom: "-10px", color: "white" }}>Powered By:</h2>
          <h1 style={{ color: "white" }}>Rocket.Chat</h1>
          <p style={{ color: "white" }}>Enter Username to join Chat</p>
          <TextField
            required
            id="outlined-required"
            label="Username"
            placeholder="Enter your username"
            type="username"
            value={newusername}
            onChange={(e) => setNewUsername(e.target.value)}
            style={{ backgroundColor: "white" }}
            fullWidth
          />
          <Button
            variant="contained"
            size="large"
            style={{
              backgroundColor: "#7BE495",
              color: "black",
              fontWeight: "bold",
              marginTop: "20px",
            }}
            onClick={handleSubmit}
          >
            Join Chat
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Box
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {user !== null && username !== null && userRocketChatToken !== null ? (
        <ChatWindow />
      ) : (
        noUserName
      )}
    </Box>
  );
}
