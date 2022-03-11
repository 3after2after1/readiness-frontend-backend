import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import IconButton from "@mui/material/IconButton";
import WatchLaterIcon from "@mui/icons-material/WatchLater";

export default function CardFilter() {
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button
            style={{
              borderRadius: 15,
              backgroundColor: "white",
              padding: "10px 15px",
            }}
            variant="contained"
            {...bindTrigger(popupState)}
          >
            <IconButton
              style={{ color: "blue[500]" }}
              aria-label="add to watchlist"
            >
              <WatchLaterIcon />
            </IconButton>
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close}>1 day</MenuItem>
            <MenuItem onClick={popupState.close}>5 days</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}
