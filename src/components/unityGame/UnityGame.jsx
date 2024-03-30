/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Unity, useUnityContext } from "react-unity-webgl";
import { setMessageFromUnity } from "../../redux/slices/testGameSlice";

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

  window.ReceiveMessageFromUnity = (message) => {
    console.log("Received message from Unity:", message);
    dispatch(setMessageFromUnity(message));
  };

  const handleUserGameID = useCallback((userId) => {
    console.log(userId);
    setUserGameId(userId);
  }, []);

  const handleLobbyCode = useCallback((LobbyCode) => {
    console.log(LobbyCode);
    setLobbyCode(LobbyCode);
  }, []);

  useEffect(() => {
    addEventListener("SendUserIdToReact", handleUserGameID);
    addEventListener("SendLobbyCodeToReact", handleLobbyCode);

    return () => {
      removeEventListener("SendUserIdToReact", handleUserGameID);
      removeEventListener("SendLobbyCodeToReact", handleLobbyCode);
    };
  }, [
    addEventListener,
    removeEventListener,
    handleUserGameID,
    handleLobbyCode,
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
    <>
      {!isLoaded && (
        <p>Loading Application... {Math.round(loadingProgression * 100)}%</p>
      )}
      <Unity
        unityProvider={unityProvider}
        style={{
          visibility: isLoaded ? "visible" : "hidden",
          height: "100%",
          width: "100%",
        }}
      />
    </>
  );
};

export default UnityGame;
