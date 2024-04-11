import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import {
  setInvitatedLobbyCode,
  setInvitedUrl,
  setViewers,
} from "../redux/slices/gameScreenSlice";
import { useDisclosure } from "@chakra-ui/react";
import { setLobbyCode } from "../redux/slices/unityGameSlice";

const SOCKET_IO_URL = process.env.REACT_APP_SERVER; // Replace with your server URL

const socket = io(SOCKET_IO_URL, {
  autoConnect: false,
});

const useSocketConnection = (user, urlUserId, gameId) => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      console.log(invitationUrl, gameLobbyCode);
      dispatch(setInvitedUrl(invitationUrl));
      dispatch(setInvitatedLobbyCode(gameLobbyCode));
      dispatch(setLobbyCode(gameLobbyCode));
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
