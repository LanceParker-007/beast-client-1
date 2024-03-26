/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

const UnityGame = ({ dataFile, frameworkFile, loaderFile, wasmFile }) => {
  const {
    sendMessage,
    addEventListener,
    removeEventListener,
    unityProvider,
    loadingProgression,
    isLoaded,
  } = useUnityContext({
    dataUrl:
      "https://unity-games-test-bucket.s3.ap-south-1.amazonaws.com/testing-builds/Harsh/Game3/reactUnityDataTransfer.data%20-%201711430359506.",
    frameworkUrl:
      "https://unity-games-test-bucket.s3.ap-south-1.amazonaws.com/testing-builds/Harsh/Game3/reactUnityDataTransfer.framework.js%20-%201711430359633.text/javascript",
    loaderUrl:
      "https://unity-games-test-bucket.s3.ap-south-1.amazonaws.com/testing-builds/Harsh/Game3/reactUnityDataTransfer.loader.js%20-%201711430359648.text/javascript",
    codeUrl:
      "https://unity-games-test-bucket.s3.ap-south-1.amazonaws.com/testing-builds/Harsh/Game3/reactUnityDataTransfer.wasm%20-%201711430359644.application/wasm",
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
