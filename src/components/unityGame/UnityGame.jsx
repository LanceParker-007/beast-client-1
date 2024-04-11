/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Unity, useUnityContext } from "react-unity-webgl";
import { setMessageFromUnity } from "../../redux/slices/gameSlice";
import { Box } from "@chakra-ui/react";
import { setUserGameId, setLobbyCode } from "../../redux/slices/unityGameSlice";

const UnityGame = ({
  publicGameDataUrl = "",
  publicGameFrameworkUrl = "",
  publicGameLoaderUrl = "",
  publicGameWasmUrl = "",
}) => {
  const { dataFile, frameworkFile, loaderFile, wasmFile } = useSelector(
    (state) => state.gameSliceReducer
  );

  const {
    sendMessage,
    addEventListener,
    removeEventListener,
    unityProvider,
    loadingProgression,
    isLoaded,
  } = useUnityContext({
    dataUrl: dataFile?.fileUrl || publicGameDataUrl,
    frameworkUrl: frameworkFile?.fileUrl || publicGameFrameworkUrl,
    loaderUrl: loaderFile?.fileUrl || publicGameLoaderUrl,
    codeUrl: wasmFile?.fileUrl || publicGameWasmUrl,
    webglContextAttributes: {
      preserveDrawingBuffer: true,
    },
  });

  const dispatch = useDispatch();
  const { userGameId, lobbyCode } = useSelector(
    (state) => state.unityGameSliceReducer
  );

  const handleUserGameID = useCallback((userId) => {
    console.log(userId);
    dispatch(setUserGameId(userId));

    dispatch(setMessageFromUnity(`${userId} received from unity`));
  }, []);

  const handleLobbyCode = useCallback((LobbyCode) => {
    console.log(LobbyCode);
    dispatch(setLobbyCode(LobbyCode));
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
    addEventListener("ShareUserId", handleUserGameID);
    addEventListener("ShareLobbyCode", handleLobbyCode);
    addEventListener("ShareDeleteInformation", handleDeleteInformation);
    addEventListener("ShareJoinLobbyRequest", handleJoinRequest);

    return () => {
      removeEventListener("ShareUserId", handleUserGameID);
      removeEventListener("ShareLobbyCode", handleLobbyCode);
      removeEventListener("ShareDeleteInformation", handleDeleteInformation);
      removeEventListener("ShareJoinLobbyRequest", handleJoinRequest);
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
    if (userGameId && lobbyCode) {
      console.log("Sending joining Request");
      sendMessage("GameController", "LobbyCodeFromBrowser", "QWERTY");
    }
  }, [userGameId, lobbyCode]);

  useEffect(() => {
    sendMessage(
      "GameController",
      "MessageFromReact",
      "Lobby code received successfully message from PlayBrutal"
    );
  }, [lobbyCode]);

  useEffect(() => {
    sendMessage(
      "GameController",
      "MessageFromReact",
      "User game Id received successfully message from PlayBrutal"
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
