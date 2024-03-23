/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

const UnityGame = () => {
  const {
    sendMessage,
    addEventListener,
    removeEventListener,
    unityProvider,
    loadingProgression,
    isLoaded,
  } = useUnityContext({
    loaderUrl: "Build/reactUnityDataTransfer.loader.js",
    dataUrl: "Build/reactUnityDataTransfer.data",
    frameworkUrl: "Build/reactUnityDataTransfer.framework.js",
    codeUrl: "Build/reactUnityDataTransfer.wasm",
    webglContextAttributes: {
      preserveDrawingBuffer: true,
    },
  });

  const [lobbyCode, setLobbyCode] = useState("");
  const [userGameId, setUserGameId] = useState("");

  window.ReceiveMessageFromUnity = (message) => {
    console.log("Received message from Unity:", message);
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
    sendMessage("GameController", "LobbyCodeFromBrowser", "12345");
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
