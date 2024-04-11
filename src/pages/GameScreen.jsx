import React, { useEffect, useState } from "react";
import { Box, Heading } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import LiveStream from "../components/liveStream/LiveStream";
import { useParams } from "react-router-dom";
import UnityGame from "../components/unityGame/UnityGame";
import { useDispatch } from "react-redux";
import { getGame } from "../redux/actions/gameScreenActions";
import SignInWithGoogleButton from "../components/signInWithGoogleButton/SignInWithGoogleButton";
import { setViewers } from "../redux/slices/gameScreenSlice";

const videoId = "mp_t-oMycyE" || process.env.REACT_APP_DUMMY_VIDEO_ID;
const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

const GameScreen = () => {
  const { userId, gameId } = useParams();
  const { user } = useSelector((state) => state.authSliceReducer);
  const { gamename, dataFile, frameworkFile, loaderFile, wasmFile, viewers } =
    useSelector((state) => state.gameScreenSliceReducer);

  const dispatch = useDispatch();

  const [streamLink, setStreamLink] = useState(videoUrl);

  // Function to getGame
  const handleGetGame = async () => {
    console.log("here");
    await dispatch(getGame({ gameId }));
  };

  useEffect(() => {
    handleGetGame();
  }, [gameId]);

  useEffect(() => {
    if (user && user?._id !== userId) {
      const updaterViewers = [...viewers];
      const findUser = updaterViewers.find((viewer) => viewer === user);
      if (!findUser) updaterViewers.push(user);
      dispatch(setViewers(updaterViewers));
      // Add to socket room
    }

    return () => {
      const updatedViewers = viewers.filter(
        (viewer) => viewer._id !== user?._id
      );
      dispatch(setViewers(updatedViewers));
      // Remove from socket room
    };
  }, [user]);

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
          <>
            <SignInWithGoogleButton />
          </>
        )}
      </Box>

      {/* CHat section or Waiting room */}
      <Box
        bgColor={"white"}
        borderRadius={11}
        height={{ base: "60vh", lg: "83vh" }}
        width={{ base: "100%", lg: "35%" }}
      >
        <Box px={2}>
          <Heading fontFamily={"Jockey One"}>Chat room</Heading>
        </Box>
        <Box
          height={"91%"}
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
          {viewers.map((viewer, index) => (
            <Box
              key={index}
              bgColor={"#141414"}
              color={"white"}
              padding={2}
              borderRadius={11}
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontFamily={"DM Monospace, monospace"}
              cursor={"pointer"}
              _hover={{
                transform: "scale(0.99)",
                backgroundColor: "#414141",
                transition: "all 0.2s",
              }}
            >
              {viewer.username}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default GameScreen;
