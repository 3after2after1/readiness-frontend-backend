import axios from "axios";
import { ROCKETCHATNODEJSAPI } from "../api/rocketchat-endpoint";

const rocketChatSSO = (accountData) => {
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
        } else if (error.response.status === 400) {
          return { error: "Bad Request" };
        } else {
          return { error: "Something went wrong" };
        }
      }
    });
};

export { rocketChatSSO, checkUserNameExist };
