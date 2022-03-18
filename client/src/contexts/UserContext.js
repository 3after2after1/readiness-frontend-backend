import { useState, useEffect, createContext, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../services/firebase";
import { rocketChatSSO } from "../services/rocketchat";
import axios from "axios";
import { onSnapshot } from "@firebase/firestore";
import { doc } from "@firebase/firestore";
import { ROCKETCHATNODEJSAPI } from "../api/rocketchat-endpoint";

const UserAccount = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);
  const [userRocketChatToken, setUserRocketChatToken] = useState(null);

  const rocketGetAuth = async () => {
    return axios
      .post(`${ROCKETCHATNODEJSAPI}rocket_auth_get`, null, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200 && response.data.loginToken) {
          setUserRocketChatToken(response.data.loginToken);
          return true;
        } else {
          setUserRocketChatToken(null);
          return false;
        }
      })
      .catch((error) => {});
  };

  const automatedRocketChatSSO = async (accountData) => {
    const rocketToken = await rocketChatSSO(accountData);
    if (rocketToken) {
      setUserRocketChatToken(rocketToken);
    } else {
      setUserRocketChatToken(null);
    }

    return;
  };

  useEffect(() => {
    let isSubscribed = true;

    onAuthStateChanged(auth, (user) => {
      console.log("auth state change");
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => (isSubscribed = false);
  }, []);

  useEffect(() => {
    let isSubscribed = true;
    async function rocketChatSSOTrigger() {
      console.log("GET AUTH CONTEXT TRIGGER");
      if (user !== null && user.uid && username !== null) {
        console.log("Getting Auth");
        const result = await rocketGetAuth();
        if (result === false) {
          console.log("ResignIn RocketChat");
          const accountData = {
            username: username,
            email: user.email,
            pass: user.uid,
            displayname: username,
          };
          automatedRocketChatSSO(accountData);
        }
      }
    }
    rocketChatSSOTrigger();
    return () => (isSubscribed = false);
  }, [username]);

  useEffect(() => {
    let isSubscribed = true;
    console.log("User Context Firebase Username Update");
    if (user !== null && user.uid) {
      const profileStoreRef = doc(db, "userprofile", user.uid);

      var unsubscribe = onSnapshot(profileStoreRef, (userprofile) => {
        if (userprofile.exists()) {
          console.log("USERNAME FOUND");
          setUsername(userprofile.data().username);
        } else {
          console.log("Missing username");
        }
      });

      return () => {
        unsubscribe();
      };
    }
    return () => (isSubscribed = false);
  }, [user]);

  useEffect(() => {
    console.log("User Context Rocket Token Update");
    console.log(userRocketChatToken);
  }, [userRocketChatToken]);

  useEffect(() => {
    console.log("User Context Update");
    if (user !== null && user.uid) {
      console.log(user.uid);
    }
  }, [user]);

  useEffect(() => {
    console.log("User Context Username Update");
    console.log(username);
  }, [username]);

  // const experimentdelete = () => {
  //   setUserRocketChatToken(null);
  // };

  return (
    <UserAccount.Provider
      value={{
        user,
        username,
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
