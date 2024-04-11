import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { setViewers } from "../redux/slices/gameScreenSlice";

const SOCKET_IO_URL = "http://localhost:5000"; // Replace with your server URL

const socket = io(SOCKET_IO_URL, {
  autoConnect: false,
});

const useSocketConnection = (user, urlUserId, gameId) => {
  const dispatch = useDispatch();

  // connect user to socket pool
  const connectToSocketNetwork = async () => {
    socket.connect();
    socket.emit("join-game-chat", user, urlUserId, gameId);

    // Listen for updates to the viewers list
    socket.on("update-viewers", (viewers) => {
      dispatch(setViewers(viewers));
    });

    // Listen for invitation event
    socket.on("invitation-from-steamer", ({ invitationUrl, gameLobbyCode }) => {
      // handleInvitationReceived(invitation);
      console.log(invitationUrl, gameLobbyCode);
    });
  };

  // invite user to play a game with you
  const sendInvitationToUser = (
    recipientSocketId,
    invitationUrl,
    gameLobbyCode
  ) => {
    console.log(invitationUrl, gameLobbyCode);
    socket.emit("send-invitation-to-viewer", {
      recipientSocketId,
      invitationUrl,
      gameLobbyCode,
    });
  };

  // Disconnect user from socket network pool
  const disconnectFromSocketNetwork = () => {
    socket.emit("leave-game-chat", user, urlUserId, gameId);
    socket.disconnect();
  };

  return {
    connectToSocketNetwork,
    disconnectFromSocketNetwork,
    sendInvitationToUser,
  };
};

export default useSocketConnection;
