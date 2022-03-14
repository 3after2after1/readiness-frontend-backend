import * as React from "react";
import { AppBar } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ListItemButton } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import EuroOutlinedIcon from "@mui/icons-material/EuroOutlined";
import "./Navbar.css";
import { styled, useTheme } from "@mui/material";
import { signOut } from "@firebase/auth";
import { auth } from "../../services/firebase";
import { UserState } from "../../contexts/UserContext";
import { useNavigate, Link, useLocation } from "react-router-dom";
// const useStyles = makeStyles({
//   text: {
//     color: "#B33030",
//     fontFamily: "Bree Serif",
//     fontWeight: "bold",
//   },
// });
const text = {
  color: "black",
  fontSize: "1rem",
  fontFamily: "Bree Serif",
  fontWeight: "bold",
};
const textLogin = {
  color: "#B33030",
  fontSize: "1rem",
  fontFamily: "Bree Serif",
  fontWeight: "bold",
};

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
  const navigate = useNavigate();
  const { user } = UserState();
  let location = useLocation();
  console.log(location.pathname);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const handleLogin = () => {
    navigate("/loginpage");
  };

  const handleLogout = () => {
    signOut(auth);
  };

  const handleWatchList = () => {
    navigate("/watchlist");
  };

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
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
        height: "100%",
        backgroundColor: "#F9F7F7",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <DrawerHeader>
        <Box style={{ paddingRight: "55px" }}>
          <img
            id="borderlesslogo"
            alt=""
            src={process.env.PUBLIC_URL + "/borderlesslogo.png"}
            // style={{ width: "40%", height: "100%" }}
          />
        </Box>
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
            <ListItemIcon>
              <EuroOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{ style: text }}
              primary="FOREX"
            />
          </ListItemButton>
        </ListItem>

        {/* <Divider /> */}
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <MonetizationOnOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{ style: text }}
              primary="CRYPTO"
            />
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton
            onClick={user === null ? handleLogin : handleWatchList}
          >
            <ListItemIcon>
              <StarOutlineOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{ style: text }}
              primary="WATCHLIST"
            />
          </ListItemButton>
        </ListItem>

        <ListItem>
          {user === null ? (
            <ListItemButton onClick={handleLogin}>
              <ListItemIcon>
                <AccountCircleOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ style: textLogin }}
                primary="LOGIN"
              />
            </ListItemButton>
          ) : (
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <AccountCircleOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ style: textLogin }}
                primary="LOG OUT"
              />
            </ListItemButton>
          )}
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1, display: "contents" }}>
      <AppBar
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
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
            <Button onClick={() => navigate("/")}>
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
                alt=""
                src={process.env.PUBLIC_URL + "/borderlesslogo.png"}
                // style={{ width: "40%", height: "100%" }}
              />
            </Button>
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
                marginRight: "10px",
              }}
            >
              Crypto
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
              onClick={user === null ? handleLogin : handleWatchList}
            >
              Watchlist
            </Button>

            {user === null ? (
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
                onClick={handleLogin}
              >
                Login
              </Button>
            ) : (
              <Button
                id="loginButton"
                color="inherit"
                variant="outlined"
                style={{
                  color: "#B33030",
                  fontSize: "0.9rem",
                  fontFamily: "Bree Serif",
                  fontWeight: "bold",
                  width: "110px",
                }}
                onClick={handleLogout}
              >
                Log out
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
