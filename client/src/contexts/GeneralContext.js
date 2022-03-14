import { useState, useEffect, createContext, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../services/firebase";
import { rocketChatSSO } from "../services/rocketchat";
import axios from "axios";
import { onSnapshot } from "@firebase/firestore";
import { doc } from "@firebase/firestore";

const GeneralContextAccess = createContext();

const GeneralContext = ({ children }) => {
  const [snackbar, setSnackBar] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const generateSnackbar = ({
    newShow = false,
    newMessage = "",
    newType = "success",
  }) => {
    setSnackBar({
      show: newShow,
      message: newMessage,
      type: newType,
    });
  };

  useEffect(() => {
    console.log("Snackbar UPDATE");
    console.log(snackbar);
  }, [snackbar]);

  return (
    <GeneralContextAccess.Provider
      value={{
        snackbar,
        generateSnackbar,
      }}
    >
      {children}
    </GeneralContextAccess.Provider>
  );
};

export default GeneralContext;

export const GeneralState = () => {
  return useContext(GeneralContextAccess);
};
