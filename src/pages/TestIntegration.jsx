import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Img,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import UnityGame from "../components/unityGame/UnityGame";

const TestIntegration = () => {
  const [zipfile, setZipFile] = useState(null);
  const [zipfileName, setZipFileName] = useState("");
  const [showGame, setShowGame] = useState(false);
  const [toggleFullScreen, setToggleFullScreen] = useState(false);

  const toast = useToast();

  const handleToggleFullScreen = (e) => {
    const gameSectionWindow = document.getElementById("gameSectionWindow");
    console.log(gameSectionWindow);
    if (!toggleFullScreen) {
      gameSectionWindow?.requestFullscreen();
      setToggleFullScreen(true);
    } else {
      document.exitFullscreen();
      setToggleFullScreen(false);
    }
  };

  const initiateFileUpload = () => {
    const fileUploadInputTag = document.getElementById("gameZipFile");
    console.log(fileUploadInputTag);
    fileUploadInputTag.click();
  };

  const handleZipFileUpload = (e) => {
    console.log(e.target.files[0]);
    const tempFile = e.target.files[0];
    const fileReader = new FileReader();

    if (tempFile) {
      fileReader.readAsDataURL(tempFile);
      fileReader.onloadend = () => {
        setZipFile(tempFile);
      };
      setZipFileName(tempFile.name);
    }
  };

  const handleStartGame = () => {
    console.log("Start Game");
    setShowGame(true);
  };

  return (
    <Box
      minHeight={"90vh"}
      display={["flex"]}
      flexDirection={["column", "row"]}
      margin={{ sm: "0 0.6rem", md: "0 1rem", lg: "0 2rem" }}
    >
      {/* Handling of uploading of game */}
      <Box
        width={{ md: "37%", lg: "33%", xl: "27%" }}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"space-between"}
        padding={"1rem 0"}
        borderRight={"1px solid #f5f5f5"}
        borderRadius={"0 6px 0 0"}
      >
        <Input
          type="file"
          id="gameZipFile"
          hidden
          accept={".zip,.rar,.7zip"}
          onChange={(e) => handleZipFileUpload(e)}
        />
        <Box
          height={"130px"}
          width={["300px", "380"]}
          bgColor={"whitesmoke"}
          borderRadius={"0.6rem"}
          padding={"1rem"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          marginTop={["1rem", "10rem"]}
          marginBottom={"1rem"}
          onClick={!zipfile ? () => initiateFileUpload() : () => {}}
        >
          <Box
            bgColor={"white"}
            border={"2px dashed #cacaca"}
            borderRadius={"0.6rem"}
            height={"100%"}
            width={"100%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            textAlign={"center"}
            cursor={"pointer"}
            fontFamily={"DM Mono, monospace"}
            padding={"0 1px"}
          >
            <Img
              width="6"
              height="6"
              src="https://img.icons8.com/sf-regular/48/upload.png"
              alt="upload"
              margin={"0 4px 0 -6px"}
            />

            {zipfileName
              ? `${zipfileName} uploaded`
              : "Upload your Webgl Build"}
          </Box>
          <Text fontSize={"12px"} color={"#a3a3a3"}>
            Files Supported: Zip
          </Text>
        </Box>

        {zipfile ? (
          <Box
            width={"100%"}
            padding={["0 1.5rem", "0 1rem"]}
            display={"flex"}
            flexDirection={{ sm: "column", lg: "row" }}
            gap={{ md: "11px", lg: "0px" }}
            justifyContent={"space-between"}
            marginBottom={"1rem"}
          >
            <Button>Remove File</Button>
            <Button>Change File</Button>
          </Box>
        ) : (
          <></>
        )}
        <Box padding={["0 1.5rem", "0 1rem"]}>
          <Alert status="success" variant="left-accent">
            <AlertIcon />
            Your game will be on our servers for the current browser session
            only!
          </Alert>
        </Box>
      </Box>
      {/* Game Screen */}
      <Box height={"100%"} width={"100%"} padding={"1rem"}>
        {/* Game will be visible here */}
        <Box
          id="gameSectionWindow"
          height={"70vh"}
          borderRadius={"6px"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          boxShadow={"0 0 6px 1px black"}
          position={"relative"}
          bgColor={"white"}
        >
          {showGame ? (
            <UnityGame />
          ) : (
            <Button
              disabled={zipfile ? false : true}
              onClick={
                zipfile
                  ? handleStartGame
                  : () =>
                      toast({
                        title: `Upload your build file`,
                        variant: "top-accent",
                        status: "warning",
                        isClosable: true,
                      })
              }
            >
              Start Game
            </Button>
          )}
          {/* Gofull screen box */}
          {zipfile ? (
            <Box
              onClick={(e) => handleToggleFullScreen(e)}
              cursor={"pointer"}
              position={"absolute"}
              bottom={"0.6rem"}
              right={"0.6rem"}
            >
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/material-outlined/24/full-screen--v1.png"
                alt="full-screen--v1"
              />
            </Box>
          ) : (
            <></>
          )}
        </Box>
        {/* Game success messages will be seen here */}
        <Box
          height={"20vh"}
          borderRadius={"6px"}
          marginTop={"1rem"}
          padding={"1rem"}
          boxShadow={"0 0 6px 1px black"}
        >
          Successfully connected messages!
        </Box>
      </Box>
    </Box>
  );
};

export default TestIntegration;
