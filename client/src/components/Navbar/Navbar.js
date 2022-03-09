import * as React from "react";
import { AppBar, makeStyles } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ListItemButton } from "@mui/material";

import "./Navbar.css";
import { createTheme, styled, ThemeProvider, useTheme } from "@mui/material";

// const useStyles = makeStyles({
//   text: {
//     color: "#B33030",
//     fontFamily: "Bree Serif",
//     fontWeight: "bold",
//   },
// });

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Navbar = () => {
  // const classes = useStyles();
  const theme = useTheme();

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <DrawerHeader>
        <IconButton onClick={toggleDrawer("left", false)}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <List>
        <ListItem>
          <ListItemButton>
            <ListItemText primary="Forex" />
          </ListItemButton>
        </ListItem>

        {/* <Divider /> */}
        <ListItem>
          <ListItemButton>
            <ListItemText primary="Crypto" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemText primary="Login" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        style={{
          backgroundColor: "#F9F7F7",
          position: "inherit",
        }}
      >
        <Toolbar>
          <div>
            {["left"].map((anchor) => (
              <React.Fragment key={anchor}>
                <IconButton
                  id="menuIcon"
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={toggleDrawer(anchor, true)}
                  sx={{ mr: 2 }}
                >
                  <MenuIcon style={{ color: "black" }} />
                </IconButton>
                <Drawer
                  anchor={anchor}
                  open={state[anchor]}
                  onClose={toggleDrawer(anchor, false)}
                >
                  {list(anchor)}
                </Drawer>
              </React.Fragment>
            ))}
          </div>
          {/* <SidebarNav /> */}
          <Box id="titleBox">
            <Typography
              id="title"
              variant="h4"
              // component="div"
              sx={{
                paddingLeft: "10px",
                fontFamily: "Bree Serif",
                color: "#184D47",
                fontWeight: "bold",
              }}
            >
              TREX
            </Typography>
            <img
              id="borderlesslogo"
              src={process.env.PUBLIC_URL + "/borderlesslogo.png"}
              // style={{ width: "40%", height: "100%" }}
            />
          </Box>

          <Box
            style={{
              maxWidth: "1000px",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Button
              id="loginButton"
              color="inherit"
              style={{
                color: "black",
                fontSize: "1rem",
                fontFamily: "Bree Serif",
                fontWeight: "bold",
                marginRight: "10px",
              }}
            >
              Forex
            </Button>

            <Button
              id="loginButton"
              color="inherit"
              style={{
                color: "black",
                fontSize: "1rem",
                fontFamily: "Bree Serif",
                fontWeight: "bold",
                marginRight: "20px",
              }}
            >
              Crypto
            </Button>
            <Button
              id="loginButton"
              color="inherit"
              variant="outlined"
              style={{
                color: "#B33030",
                fontSize: "1rem",
                fontFamily: "Bree Serif",
                fontWeight: "bold",
              }}
            >
              Login
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
