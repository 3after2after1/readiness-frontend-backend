import * as React from "react";
import { AppBar, makeStyles, modalUnstyledClasses } from "@mui/material";
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
import { signOut } from "@firebase/auth";
import { auth } from "../../services/firebase";
import { UserState } from "../../contexts/UserContext";
import { useNavigate, useLocation } from "react-router-dom";
import { styled, useTheme } from "@mui/material";
import "./Navbar.css";
let flag = true;

const text = {
  color: flag === true ? "black" : "white",
  fontSize: "1rem",
  fontFamily: "Bree Serif",
  fontWeight: "bold",
};
const textLogin = {
  color: flag === true ? "#B33030" : "#FFCE45",
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
  const theme = useTheme();
  const navigate = useNavigate();
  const { user } = UserState();
  const [flag, setFlag] = React.useState(true);

  let location = useLocation().pathname;
  console.log(location);
  React.useEffect(() => {
    //rerender different navbar based on routes
    if (
      location.startsWith("/details") ||
      location.startsWith("/forex") ||
      location.startsWith("/crypto") ||
      location.startsWith("/favourite")
    ) {
      setFlag(false);
    } else {
      setFlag(true);
    }
  }, [location]);

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
    navigate("/favourite");
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
        backgroundColor: flag === true ? "#F9F7F7" : "#184D47",
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
            <ChevronLeftIcon
              style={{ color: flag === true ? "black" : "white" }}
            />
          ) : (
            <ChevronRightIcon
              style={{ color: flag === true ? "black" : "white" }}
            />
          )}
        </IconButton>
      </DrawerHeader>

      <List>
        <ListItem>
          <ListItemButton onClick={() => navigate("/forex")}>
            <ListItemIcon>
              <EuroOutlinedIcon
                style={{ color: flag === true ? "black" : "white" }}
              />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{ style: text }}
              primary="FOREX"
            />
          </ListItemButton>
        </ListItem>

        {/* <Divider /> */}
        <ListItem>
          <ListItemButton onClick={() => navigate("/crypto")}>
            <ListItemIcon>
              <MonetizationOnOutlinedIcon
                style={{ color: flag === true ? "black" : "white" }}
              />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{ style: text }}
              primary="CRYPTO"
            />
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton onClick={handleWatchList}>
            <ListItemIcon>
              <StarOutlineOutlinedIcon
                style={{ color: flag === true ? "black" : "white" }}
              />
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
                <AccountCircleOutlinedIcon
                  style={{ color: flag === true ? "black" : "#FFCE45" }}
                />
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
          backgroundColor: flag === true ? "#F9F7F7" : "#184D47",
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
                  <MenuIcon
                    style={{ color: flag === true ? "black" : "white" }}
                  />
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
                style={{
                  paddingLeft: "10px",
                  fontFamily: "Bree Serif",
                  color: flag === true ? "#184D47" : "white",
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
                color: flag === true ? "black" : "white",
                fontSize: "1rem",
                fontFamily: "Bree Serif",
                fontWeight: "bold",
                marginRight: "10px",
              }}
              onClick={() => navigate("/forex")}
            >
              Forex
            </Button>

            <Button
              id="loginButton"
              color="inherit"
              style={{
                color: flag === true ? "black" : "white",
                fontSize: "1rem",
                fontFamily: "Bree Serif",
                fontWeight: "bold",
                marginRight: "10px",
              }}
              onClick={() => navigate("/crypto")}
            >
              Crypto
            </Button>

            <Button
              id="loginButton"
              color="inherit"
              style={{
                color: flag === true ? "black" : "white",
                fontSize: "1rem",
                fontFamily: "Bree Serif",
                fontWeight: "bold",
                marginRight: "20px",
              }}
              onClick={handleWatchList}
            >
              Watchlist
            </Button>

            {user === null ? (
              <Button
                id="loginButton"
                color="inherit"
                variant="outlined"
                style={{
                  color: flag === true ? "#B33030" : "#FFCE45",
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
                  color: flag === true ? "#B33030" : "#FFCE45",
                  fontSize: "0.8rem",
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
