import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import LiveStream from "../components/liveStream/LiveStream";
import { useParams } from "react-router-dom";
import UnityGame from "../components/unityGame/UnityGame";
import { useDispatch } from "react-redux";
import { getGame } from "../redux/actions/gameScreenActions";
import useSocketConnection from "../utils/socket";
import {
  setGameFilesEmpty,
  setInvitatedLobbyCode,
  setInvitedUrl,
} from "../redux/slices/gameScreenSlice";
import { useNavigate } from "react-router-dom";
import { setLobbyCode } from "../redux/slices/unityGameSlice";

const videoId = "mp_t-oMycyE" || process.env.REACT_APP_DUMMY_VIDEO_ID;
const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

const GameScreen = () => {
  const { userId, gameId } = useParams();
  const { user } = useSelector((state) => state.authSliceReducer);
  const {
    gamename,
    dataFile,
    frameworkFile,
    loaderFile,
    wasmFile,
    viewers,
    invitedUrl,
    invitedLobbyCode,
  } = useSelector((state) => state.gameScreenSliceReducer);
  const { lobbyCode } = useSelector((state) => state.unityGameSliceReducer);
  // Custom hook to get connected to socket
  const {
    connectToSocketNetwork,
    disconnectFromSocketNetwork,
    sendInvitationToUser,
  } = useSocketConnection(user, userId, gameId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [streamLink, setStreamLink] = useState(videoUrl);

  //------ Handle select user start
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserSelection = (viewer) => {
    setSelectedUser(viewer);
  };
  //------ Handle select user end

  //------ Handle Invited User start
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAcceptRequest = () => {
    console.log(invitedLobbyCode);
    // setLobbyCode(invitedLobbyCode);
    // window.open(invitedUrl, "_blank");
    navigate(invitedUrl, { target: "_blank" });
    dispatch(setInvitedUrl(""));
    dispatch(setInvitatedLobbyCode(""));
    onClose();
  };

  const handleDeclineRequest = () => {
    dispatch(setInvitedUrl(""));
    dispatch(setInvitatedLobbyCode(""));
    onClose();
  };
  //------ Handle Invited User end

  // Function to getGame
  const handleGetGame = async () => {
    await dispatch(getGame({ gameId }));
  };

  useEffect(() => {
    if (user !== null && user !== "" && user !== undefined && gameId) {
      connectToSocketNetwork(user, userId, gameId);
    }
    if (user && user?._id === userId) handleGetGame();

    // Listen for beforeunload event
    const handleBeforeUnload = () => {
      if (userId && gameId) disconnectFromSocketNetwork(user, userId, gameId);
      dispatch(setGameFilesEmpty());
      dispatch(setInvitedUrl(""));
      dispatch(setInvitatedLobbyCode(""));
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup function for unmounting
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [user, userId, gameId]);

  useEffect(() => {
    if (selectedUser) {
      console.log(selectedUser);
      // Generate viewer invite url
      const invitationUrl = `/games/${selectedUser?.userId}/${gameId}`;

      // Share invitation URL with the selected user
      sendInvitationToUser(selectedUser?.socketId, invitationUrl, "QWERTY");
      setSelectedUser(null);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (invitedUrl && invitedLobbyCode && lobbyCode && user?.id !== userId)
      onOpen();
  }, [invitedUrl, invitedLobbyCode, lobbyCode]);

  return (
    <Box
      bgColor={"#141414"}
      height={"100vh"}
      minHeight={"100vh"}
      padding={{ base: 1, sm: "1rem", lg: "1rem 6rem" }}
      display={"flex"}
      flexDirection={{ base: "column", lg: "row" }}
      gap={2}
    >
      {/* Game for the original user, show stream or waiting room for audience*/}
      <Box
        height={{ base: "30vh", sm: "60vh", md: "70vh", lg: "70vh" }}
        width={{ base: "100%", lg: "65%" }}
      >
        {/* Game Screen for streamer and video link of Youtube stream for audience or it can be bkanked */}
        {/* Viewers will see the stream if some link is provided */}
        {user?._id === userId && wasmFile ? (
          <Box height={"100%"} width={"100%"}>
            <UnityGame
              publicGameDataUrl={dataFile}
              publicGameFrameworkUrl={frameworkFile}
              publicGameLoaderUrl={loaderFile}
              publicGameWasmUrl={wasmFile}
              invitedLobbyCode={invitedLobbyCode}
            />
          </Box>
        ) : user?._id !== userId && streamLink ? (
          <LiveStream streamLink={streamLink} />
        ) : user ? (
          <Box
            height={"100%"}
            width={"100%"}
            bgColor={"white"}
            color={"black"}
            borderRadius={11}
            display={"flex"}
            // justifyContent={"center"}
            alignItems={"center"}
            textAlign={"justify"}
            padding={2}
            fontFamily={"Jockey One"}
            className="gradient-background"
          >
            You are in the waiting room and visible to Streamer, please wait
            until streamer picks you up.
          </Box>
        ) : (
          <>You need to sign in</>
        )}
      </Box>

      {/* Chat section or Waiting room */}
      <Box
        bgColor={"white"}
        borderRadius={11}
        height={{ base: "60vh", md: "83vh" }}
        width={{ base: "100%", lg: "35%" }}
      >
        <Box px={2}>
          <Heading fontFamily={"Jockey One"}>Chat room</Heading>
        </Box>
        <Box
          height={"83%"}
          width={{ base: "100%" }}
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))"
          gridGap={2}
          padding={2}
          overflowY={"auto"}
          css={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
            "&::-webkit-scrollbar-track": {
              display: "none",
            },
            "&::-webkit-scrollbar-thumb": {
              display: "none",
            },
          }}
        >
          {viewers &&
            userId &&
            gameId &&
            viewers[`${userId}${gameId}`] &&
            viewers[`${userId}${gameId}`].map((viewer, index) => (
              <Box
                key={index}
                bgColor={"#141414"}
                color={"white"}
                padding={2}
                borderRadius={11}
                display="flex"
                alignItems="center"
                justifyContent="center"
                textAlign={"center"}
                fontFamily={"DM Monospace, monospace"}
                cursor={"pointer"}
                _hover={{
                  transform: "scale(0.99)",
                  backgroundColor: "#414141",
                  transition: "all 0.2s",
                }}
                onClick={
                  user?._id === userId
                    ? () => handleUserSelection(viewer)
                    : () => {}
                }
              >
                {viewer.username}
              </Box>
            ))}
        </Box>
      </Box>

      {/* Modal to accept invite */}
      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalOverlay />
        <ModalContent h="300px">
          {" "}
          {/* Set a fixed height */}
          <ModalHeader
            fontSize="2xl"
            fontWeight="bold"
            textAlign="center"
            color="Orange"
          >
            Game Invitation 🚀
          </ModalHeader>
          <ModalBody>
            <Box textAlign="center" mb={4}>
              <Text>You have been invited to join the game.</Text>
            </Box>
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button
              colorScheme="green"
              mr={3}
              onClick={handleAcceptRequest}
              fontSize="md"
              fontWeight="bold"
            >
              Accept
            </Button>
            <Button
              colorScheme="red"
              onClick={handleDeclineRequest}
              fontSize="md"
              fontWeight="bold"
            >
              Decline
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default GameScreen;
