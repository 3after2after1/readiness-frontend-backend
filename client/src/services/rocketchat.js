import axios from "axios";

const ROCKETCHATNODEJSAPI = "http://192.168.100.164:3032/";

const rocketChatSSO = (accountData) => {
  //   const data = {
  //     username: username,
  //     email: user.email,
  //     pass: password,
  //     displayname: username,
  //   };

  return axios
    .post(`${ROCKETCHATNODEJSAPI}rocket_sso`, accountData, {
      withCredentials: true,
    })
    .then((response) => {
      return response.data.loginToken;
    })
    .catch((error) => {});
};

const checkUserNameExist = (username) => {
  return axios
    .post(
      `${ROCKETCHATNODEJSAPI}getuser`,
      { username: username },
      {
        withCredentials: true,
      }
    )
    .then((response) => {
      if (response.status === 200) {
        return { result: true };
      } else {
        return { result: false };
      }
    })
    .catch((error) => {
      if (!error.response) {
        return { error: "Connection Error" };
      } else {
        if (error.response.status === 404) {
          return { result: false };
        } else {
          return { error: "Bad Request" };
        }
      }
    });
};

export { rocketChatSSO, checkUserNameExist };
