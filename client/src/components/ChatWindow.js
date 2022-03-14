import { UserState } from "../contexts/UserContext";

const ChatWindow = () => {
  const { userRocketChatToken } = UserState();

  const onMyFrameLoad = async () => {
    const chatbox = document.getElementById("rocket");
    // const usertoken = await axios
    //   .post("http://192.168.100.164:3032/rocket_auth_get", null, {
    //     withCredentials: true,
    //   })
    //   .then((response) => response.data.loginToken)
    //   .catch((error) => {});
    console.log("FRAME REFRESH");
    console.log(userRocketChatToken);
    chatbox.contentWindow.postMessage(
      {
        event: "login-with-token",
        loginToken: userRocketChatToken,
      },
      "http://192.168.100.164:3005/"
    );
  };
  return (
    <iframe
      id="rocket"
      key={userRocketChatToken}
      style={{ width: "100%", height: "100%" }}
      src="http://192.168.100.164:3005/channel/general/?layout=embedded"
      title="myframe"
      onLoad={onMyFrameLoad}
    ></iframe>
  );
};

export default ChatWindow;
