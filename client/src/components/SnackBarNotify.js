import { Snackbar } from "@material-ui/core";
import { Alert } from "@mui/material";
//import MuiAlert from "@material-ui/lab/Alert";
import { GeneralState } from "../contexts/GeneralContext";

const SnackBarNotify = () => {
  const { snackbar, generateSnackbar } = GeneralState();

  const handleSnackbarDismiss = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    generateSnackbar({
      newShow: false,
      newMessage: "",
      newType: snackbar.type,
    });
  };

  return (
    <Snackbar
      open={snackbar.show}
      autoHideDuration={5000}
      onClose={handleSnackbarDismiss}
    >
      <Alert variant="filled" severity={snackbar.type}>
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBarNotify;
