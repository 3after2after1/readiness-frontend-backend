import { useState, useEffect, createContext, useContext } from "react";

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
