import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import IconButton from "@mui/material/IconButton";
import WatchLaterIcon from "@mui/icons-material/WatchLater";

export default function CardFilter({ setRange }) {
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          {popupState.close}
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
            <MenuItem
              onClick={(e) => {
                console.log(e.target.innerText);
                setRange((prev) => {
                  return e.target.innerText;
                });
              }}
            >
              day
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                console.log(e.target.innerText);
                setRange((prev) => {
                  return e.target.innerText;
                });
              }}
            >
              week
            </MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}
