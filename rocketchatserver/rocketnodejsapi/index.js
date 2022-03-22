var express = require("express");
var session = require("express-session");
var app = express();
var bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
var axios = require("axios");
const { response } = require("express");

app.use(
  session({
    secret: "dfwoiefewwnecwencwnfhrgfgrfrty84fwir767",
    saveUninitialized: false,
    cookie: { maxAge: 86400000 },
    resave: false,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Bad Practice, included token here to easier testing. Token info should be injected by environment variable
const rocketAdmToken = "UwpWQOWxw7ksZXOBeAd58MXRj3xng9RtpS2pUN5GWaf";
const rocketAdmId = "MRF2rAzAuzZu4LHhx";
// const rocketAdmToken = "pC1BKq13TCRimLWWDMvNTFlMJBnejiJpz2DF8oWPfyp";
// const rocketAdmId = "PYdJzWSiEMgahwCms";
// const rocketAdmToken = "7X8ymH2ccUhdfju01XPi4SPSfrwGG1syxToD5pCuVQY";
// const rocketAdmId = "QTsScxbo2sEnSmLmS";
const ROCKETCHAT_SERVER =
  "http://ec2-52-221-189-46.ap-southeast-1.compute.amazonaws.com:3005/";
const ROCKETCHAT_API = `${ROCKETCHAT_SERVER}api/v1/`;
const axiosConfig = {
  headers: {
    "X-Auth-Token": rocketAdmToken,
    "X-User-Id": rocketAdmId,
  },
};

app.use((req, res, next) => {
  //Multiple whitelist for ease of testing,
  //Best practice to limit only production origin
  let allowedOrigins = [
    "http://localhost:3001",
    "http://localhost:3000",
    "http://localhost:3005",
    "http://157.245.199.211:3005",
    "http://192.168.100.164:3005",
    "http://52.221.189.46:8080",
    "http://ec2-52-221-189-46.ap-southeast-1.compute.amazonaws.com:8080",
    "http://167.172.70.151:8080",
  ];
  let origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  //res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin , Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );

  next();
});

//Server health check
app.get("/", function (req, res) {
  res.status(200).send("OK");
});

//API to check if username exist, admin authority token required
app.post("/getuser", function (req, res) {
  console.log(req.body.username);
  if (req.body.username) {
    axios
      .get(
        `${ROCKETCHAT_API}users.info?username=${req.body.username}`,
        axiosConfig
      )
      .then(function (response) {
        if (response.data.success === true) {
          res.send({ user: response.data.user, search_status: "success" });
        }
      })
      .catch(function (error) {
        if (error.code || error.response.status === 401) {
          //res.status(500).send("Something went wrong");
          res.status(500).send(error);
        } else {
          res.status(404).send("Not Found");
        }
      });
  } else {
    res.status(400).send("Bad Request");
  }
});

//Perform automated login, signup with single API call
app.post("/rocket_sso", function (req, res) {
  var userPayload = {
    username: req.body.username,
    email: req.body.email,
    pass: req.body.pass,
    name: req.body.displayname,
  };

  req.session.username = userPayload.username;
  req.session.email = userPayload.email;
  req.session.pass = userPayload.pass;
  req.session.displayname = userPayload.name;

  if (userPayload.username) {
    //Check if username exist
    axios
      .get(
        `${ROCKETCHAT_API}users.info?username=${userPayload.username}`,
        axiosConfig
      )
      .then(function (response) {
        //If found, login user
        if (response.data.success === true) {
          if (response.data.user.username) {
            axios
              .post(`${ROCKETCHAT_API}login`, {
                username: userPayload.username,
                password: userPayload.pass,
              })
              .then(function (response) {
                if (response.data.status === "success") {
                  req.session.userauthtoken = response.data.data.authToken;
                  req.session.save();
                  res.set("Content-Type", "application/json");
                  res
                    .status(200)
                    .send({ loginToken: response.data.data.authToken });
                  // res.send(`<script>
                  // window.parent.postMessage({
                  // 	event: 'login-with-token',
                  // 	loginToken: '${response.data.data.authToken}'
                  // }, 'http://localhost:3005'); // rocket.chat's URL
                  // </script>`);
                }
              });
          }
        }
      })
      .catch(function (error) {
        //if no user found, register
        axios
          .post(`${ROCKETCHAT_API}users.register`, {
            username: userPayload.username,
            email: userPayload.email,
            pass: userPayload.pass,
            name: userPayload.name,
          })
          .then(function (response) {
            if (response.data.success) {
              return axios.post(`${ROCKETCHAT_API}login`, {
                username: userPayload.username,
                password: userPayload.pass,
              });
            }
          })
          .then(function (response) {
            if (response.data.status === "success") {
              req.session.userauthtoken = response.data.data.authToken;
              req.session.save();
              res.set("Content-Type", "application/json");
              res
                .status(200)
                .send({ loginToken: response.data.data.authToken });
              //       res.set("Content-Type", "text/html");
              //       res.send(`<script>
              // window.parent.postMessage({
              // 	event: 'login-with-token',
              // 	loginToken: '${response.data.data.authToken}'
              // }, 'http://localhost:3005'); // rocket.chat's URL
              // </script>`);
            }
          })
          .catch(function (error) {
            res.sendStatus(401);
          });
      });
  }
});

//API to request existing authentication token for running session
app.post("/rocket_auth_get", function (req, res) {
  res.status(200).send({
    loginToken: req.session.userauthtoken,
  });
});

//API for rocket chat to retrieve IFrame for same server hosting
app.post("/rocket_iframe", function (req, res) {
  return res.send(`<script>
				window.parent.postMessage({
					event: 'login-with-token',
					loginToken: '${req.session.userauthtoken}'
				}, ${ROCKETCHAT_SERVER}); // rocket.chat's URL
				</script>`);
});

//API to check if channel exists
app.post("/rocket_check_channel", function (req, res) {
  // On Hold, priority on client fixes
  console.log("WIP");
});

//API to create new public channel
app.post("/rocket_create_channel", function (req, res) {
  // On Hold, priority on client fixes
  console.log("WIP");
});

//Server test API to verify session functionality
app.get("/testapi", function (req, res) {
  if (req.session.userdata) {
    res.send("not first time");
  } else {
    req.session.userdata = "hehe";
    res.send("first time");
  }
});

app.listen(3032, function () {
  console.log("Example app listening on port 3032!");
});
