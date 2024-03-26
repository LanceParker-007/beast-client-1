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
import React, { useEffect, useState } from "react";
import UnityGame from "../components/unityGame/UnityGame";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setBuildFolder,
  setDataFile,
  setFrameworkFile,
  setLoaderFile,
  setWasmFile,
} from "../redux/slices/testGameSlice";

const TestIntegration = () => {
  // To store file urls from we will get from s3
  const { dataFile, frameworkFile, loaderFile, wasmFile, buildFolder } =
    useSelector((state) => state.testGameSliceReducer);
  const dispatch = useDispatch();

  const [data, setData] = useState(null);
  const [framework, setFramework] = useState(null);
  const [loader, setLoader] = useState(null);
  const [wasm, setWasm] = useState(null);
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
    const fileUploadInputTag = document.getElementById("gamebuildFolder");
    console.log(fileUploadInputTag);
    fileUploadInputTag.click();
  };

  const handlebuildFolderUpload = (e) => {
    console.log(e.target.files);
    const tempFiles = Array.from(e.target.files);

    console.log("48");

    tempFiles.forEach((tempFile, index) => {
      tempFile = e.target.files[index];
      if (index === 0) {
        setData(tempFile);
      } else if (index === 1) {
        setFramework(tempFile);
      } else if (index === 2) {
        setLoader(tempFile);
      } else if (index === 3) {
        setWasm(tempFile);
      }
    });

    console.log("70");
  };

  const getPresignedUrl = async (fileInfo) => {
    const { data } = await axios.post(
      `http://localhost:5000/api/v1/user/get-presigned-url-for-test-game`,
      {
        username: "Harsh",
        gamename: `Game3`,
        filename: fileInfo.name,
        fileType: fileInfo.type,
      }
    );

    return data;
  };

  const getPresignedUrlUploadToS3SaveFileInfoToDB = async (file) => {
    // Step1: getPresignedUrl
    const preSignedUrlData = await getPresignedUrl(file);
    console.log(preSignedUrlData);

    // Step2: UploadFileToS3
    const { data } = await axios.put(`${preSignedUrlData.signedURL}`, file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // console.log(data);
    const url = preSignedUrlData.signedURL.split("?")[0];
    const public_id = preSignedUrlData.public_id;

    // Step3: Save file info to Db and then in slice object
    console.log(file.name, url);
    console.log(public_id);
  };

  const handleStartGame = () => {
    console.log("Start Game");
    setShowGame(true);
  };

  useEffect(() => {
    if (data && framework && loader && wasm) {
      getPresignedUrlUploadToS3SaveFileInfoToDB(data);
      getPresignedUrlUploadToS3SaveFileInfoToDB(framework);
      getPresignedUrlUploadToS3SaveFileInfoToDB(loader);
      getPresignedUrlUploadToS3SaveFileInfoToDB(wasm);
      dispatch(setBuildFolder(true));
    }
  }, [data, framework, loader, wasm]);

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
          id="gamebuildFolder"
          hidden
          webkitdirectory={"true"}
          mozdirectory={"true"}
          directory=""
          onChange={(e) => handlebuildFolderUpload(e)}
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
          onClick={!buildFolder ? () => initiateFileUpload() : () => {}}
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

            {buildFolder
              ? `All files correct`
              : "Upload your Webgl Build Folder"}
          </Box>
        </Box>

        {buildFolder ? (
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
            <UnityGame
              dataFile={dataFile}
              frameworkFile={frameworkFile}
              loaderFile={loaderFile}
              wasmFile={wasmFile}
            />
          ) : (
            <Button
              disabled={buildFolder ? false : true}
              onClick={
                buildFolder
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
          {buildFolder ? (
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
