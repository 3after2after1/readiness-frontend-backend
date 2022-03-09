import { useState, useEffect, createContext, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";
import { rocketChatSSO } from "../services/rocketchat";
import axios from "axios";

const UserAccount = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRocketChatToken, setUserRocketChatToken] = useState(null);

  const rocketGetAuth = () => {
    axios
      .post("http://192.168.100.164:3032/rocket_auth_get", null, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200 && response.data.loginToken) {
          setUserRocketChatToken(response.data.loginToken);
        } else {
          setUserRocketChatToken(null);
        }
      })
      .catch((error) => {});
  };

  const automatedRocketChatSSO = (accountData) => {
    rocketChatSSO(accountData);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("auth state change");
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  useEffect(() => {
    rocketGetAuth();
  }, []);

  useEffect(() => {
    console.log("User Context Update");
    console.log(user);
    if (user !== null && user.uid) {
      console.log(user.uid);
    }
  }, [user]);

  useEffect(() => {
    console.log("User Context Rocket Token Update");
    console.log(userRocketChatToken);
  }, [userRocketChatToken]);

  // const experimentdelete = () => {
  //   setUserRocketChatToken(null);
  // };

  return (
    <UserAccount.Provider
      value={{
        user,
        userRocketChatToken,
        automatedRocketChatSSO,
      }}
    >
      {children}
    </UserAccount.Provider>
  );
};

export default UserContext;

export const UserState = () => {
  return useContext(UserAccount);
};
