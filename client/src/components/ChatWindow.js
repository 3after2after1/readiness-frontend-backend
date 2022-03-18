import { UserState } from "../contexts/UserContext";
import { ROCKETCHATAPIURL } from "../api/rocketchat-endpoint";

const ChatWindow = () => {
  const { userRocketChatToken } = UserState();
  const iFrameUrl = `${ROCKETCHATAPIURL}channel/general/?layout=embedded`;

  const onMyFrameLoad = async () => {
    const chatbox = document.getElementById("rocket");
    console.log("FRAME REFRESH");
    console.log(userRocketChatToken);
    chatbox.contentWindow.postMessage(
      {
        event: "login-with-token",
        loginToken: userRocketChatToken,
      },
      ROCKETCHATAPIURL
    );

    return;
  };
  return (
    <iframe
      id="rocket"
      key={userRocketChatToken}
      style={{ width: "100%", height: "100%" }}
      src={iFrameUrl}
      title="myframe"
      onLoad={onMyFrameLoad}
    ></iframe>
  );
};

export default ChatWindow;
