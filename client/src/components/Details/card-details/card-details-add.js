import * as React from "react";
import Button from "@mui/material/Button";
import PopupState, { bindTrigger } from "material-ui-popup-state";
import IconButton from "@mui/material/IconButton";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { yellow } from "@material-ui/core/colors";

export default function CardDetailsAdd() {
  const [btn, setBtn] = React.useState(true);

  const handleClick = () => {
    setBtn(!btn);
  };

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button
            style={{
              borderRadius: 10,
              backgroundColor: "white",
              padding: "2px",
              // height: "80px"
            }}
            variant="contained"
            {...bindTrigger(popupState)}
          >
            <IconButton
              onClick={handleClick}
              style={{ color: "blue[500]" }}
              aria-label="add to watchlist"
              children={
                btn ? (
                  <StarBorderIcon />
                ) : (
                  <StarIcon sx={{ color: yellow[800] }} />
                )
              }
            ></IconButton>
          </Button>
        </React.Fragment>
      )}
    </PopupState>
  );
}
