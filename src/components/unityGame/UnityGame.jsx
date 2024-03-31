/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Unity, useUnityContext } from "react-unity-webgl";
import { setMessageFromUnity } from "../../redux/slices/testGameSlice";
import { Box } from "@chakra-ui/react";

const UnityGame = () => {
  const { dataFile, frameworkFile, loaderFile, wasmFile } = useSelector(
    (state) => state.testGameSliceReducer
  );

  const {
    sendMessage,
    addEventListener,
    removeEventListener,
    unityProvider,
    loadingProgression,
    isLoaded,
  } = useUnityContext({
    dataUrl: dataFile.fileUrl,
    frameworkUrl: frameworkFile.fileUrl,
    loaderUrl: loaderFile.fileUrl,
    codeUrl: wasmFile.fileUrl,
    webglContextAttributes: {
      preserveDrawingBuffer: true,
    },
  });

  const dispatch = useDispatch();
  const [lobbyCode, setLobbyCode] = useState("");
  const [userGameId, setUserGameId] = useState("");

  const handleUserGameID = useCallback((userId) => {
    console.log(userId);
    setUserGameId(userId);

    dispatch(setMessageFromUnity(`${userId} received from unity`));
  }, []);

  const handleLobbyCode = useCallback((LobbyCode) => {
    console.log(LobbyCode);
    setLobbyCode(LobbyCode);
    dispatch(setMessageFromUnity(`${LobbyCode} received from unity`));
  }, []);

  const handleDeleteInformation = useCallback((LobbyCode, username) => {
    console.log(LobbyCode, username);
    dispatch(setMessageFromUnity(`${username} leaft the lobby`));
  }, []);

  const handleJoinRequest = useCallback((LobbyCode, username) => {
    console.log(LobbyCode, username);
    dispatch(
      setMessageFromUnity(`${LobbyCode} joined the lobby from inside the game`)
    );
  }, []);

  useEffect(() => {
    addEventListener("SendUserIdToReact", handleUserGameID);
    addEventListener("SendLobbyCodeToReact", handleLobbyCode);
    addEventListener("SendDeleteInformation", handleDeleteInformation);
    addEventListener("SendJoinLobbyRequest", handleJoinRequest);

    return () => {
      removeEventListener("SendUserIdToReact", handleUserGameID);
      removeEventListener("SendLobbyCodeToReact", handleLobbyCode);
      removeEventListener("SendDeleteInformation", handleDeleteInformation);
      removeEventListener("SendJoinLobbyRequest", handleJoinRequest);
    };
  }, [
    addEventListener,
    removeEventListener,
    handleUserGameID,
    handleLobbyCode,
    handleDeleteInformation,
    handleJoinRequest,
  ]);

  useEffect(() => {
    sendMessage("GameController", "LobbyCodeFromBrowser", "Qwerty");
  });

  useEffect(() => {
    sendMessage(
      "GameController",
      "MessageFromReact",
      "Lobby code received successfully"
    );
  }, [lobbyCode]);

  useEffect(() => {
    sendMessage(
      "GameController",
      "MessageFromReact",
      "User game Id received successfully"
    );
  }, [userGameId]);

  return (
    <Box width={"100%"} height={"100%"}>
      {!isLoaded && (
        <Box
          bgColor={"#414141"}
          color={"white"}
          display={"flex"}
          justifyContent={"center"}
          height={"100%"}
          alignItems={"center"}
        >
          Loading Application... {Math.round(loadingProgression * 100)}%
        </Box>
      )}
      <Unity
        unityProvider={unityProvider}
        style={{
          visibility: isLoaded ? "visible" : "hidden",
          height: "100%",
          width: "100%",
        }}
      />
    </Box>
  );
};

export default UnityGame;
