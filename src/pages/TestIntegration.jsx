/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  Divider,
  Heading,
  Img,
  Input,
  Select,
  StatDownArrow,
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
import { useNavigate } from "react-router-dom";
import { DeleteIcon } from "@chakra-ui/icons";
import { setTestBuilds, setUser } from "../redux/slices/authSlice";
import Cookies from "js-cookie";

const TestIntegration = () => {
  // To store file urls from we will get from s3
  const {
    dataFile,
    frameworkFile,
    loaderFile,
    wasmFile,
    buildFolder,
    messageFromUnity,
  } = useSelector((state) => state.testGameSliceReducer);
  const { user, testBuilds } = useSelector((state) => state.authSliceReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [gamename, setGamename] = useState("");
  const [displayGameName, setDisplayGameName] = useState("");
  const [data, setData] = useState(null);
  const [framework, setFramework] = useState(null);
  const [loader, setLoader] = useState(null);
  const [wasm, setWasm] = useState(null);
  const [showGame, setShowGame] = useState(false);
  const [toggleFullScreen, setToggleFullScreen] = useState(false);

  const [messagesFromUnity, setMessagesFromUnity] = useState([]);

  const toast = useToast();

  // Handle Toggle FullScreen
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

  //Initiate Build Folder Uploading
  const initiateFileUpload = () => {
    if (!gamename) {
      toast({
        title: `Give your build a name!`,
        variant: "top-accent",
        status: "warning",
        isClosable: true,
      });
      return;
    }

    const fileUploadInputTag = document.getElementById("gamebuildFolder");
    fileUploadInputTag.click();
  };

  //Handle Build Folder Uploading
  const handlebuildFolderUpload = (e) => {
    const tempFiles = Array.from(e.target.files);

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
  };

  // Check if gamename already present
  const ifGamenameAlreadyPrsent = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/v1/user/if-gamename-already-present`,
        {
          gamename: gamename,
          gameOwner: user._id,
        }
      );

      return data;
    } catch (error) {
      toast({
        title: "Some network eror",
        variant: "top-accent",
        status: "error",
        isClosable: true,
      });
    }
  };

  // Get Presigned url from backend
  const getPresignedUrl = async (fileInfo) => {
    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER}/api/v1/user/get-presigned-url-for-test-game`,
      {
        username: user.username,
        gamename: gamename,
        filename: fileInfo.name,
        fileType: fileInfo.type,
      }
    );

    return data;
  };

  // Fetch all test builds of user
  const fetchAllTestBuilds = async () => {
    if (user) {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/v1/user/get-all-test-builds`,
        {
          gameOwner: user._id,
        }
      );

      console.log(data.games);
      await dispatch(setTestBuilds(data.games));
    }
  };

  // Intiate Presigned Url and uploading to s3
  const getPresignedUrlUploadToS3 = async (file) => {
    // Step1: getPresignedUrl
    const preSignedUrlData = await getPresignedUrl(file);
    console.log(preSignedUrlData);

    const url = preSignedUrlData.signedURL.split("?")[0];
    const public_id = preSignedUrlData.public_id;

    // Step3: UploadFileToS3
    const { res } = await axios.put(`${preSignedUrlData.signedURL}`, file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res);

    // Step2: Save file info redux store
    if (file.name.includes("data")) {
      await dispatch(
        setDataFile({
          filePublicId: public_id,
          fileUrl: url,
          key: `testing-builds/${user.username}/${gamename}/${public_id}`,
        })
      );
    } else if (file.name.includes("framework")) {
      await dispatch(
        setFrameworkFile({
          filePublicId: public_id,
          fileUrl: url,
          key: `testing-builds/${user.username}/${gamename}/${public_id}`,
        })
      );
    } else if (file.name.includes("loader")) {
      await dispatch(
        setLoaderFile({
          filePublicId: public_id,
          fileUrl: url,
          key: `$unity-games-test-bucket/
          testing-builds/{user.username}/${gamename}/${public_id}`,
        })
      );
    } else if (file.name.includes("wasm")) {
      await dispatch(
        setWasmFile({
          filePublicId: public_id,
          fileUrl: url,
          key: `$unity-games-test-bucket/
          testing-builds/{user.username}/${gamename}/${public_id}`,
        })
      );
    }
  };

  const saveFilesInfoToDB = async () => {
    if (!gamename) return;
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/v1/user/save-test-game-details`,
        {
          dataFile: dataFile,
          frameworkFile: frameworkFile,
          loaderFile: loaderFile,
          wasmFile: wasmFile,
          gamename: gamename,
          gameOwner: user._id,
        }
      );

      toast({
        title: data.message,
        variant: "top-accent",
        status: data.success ? "success" : "info",
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Some error occured whilw saving the game.",
        variant: "top-accent",
        status: "error",
        isClosable: true,
      });
    }
  };

  // Remove a users all test builds
  const handleDeleteMyBuilds = async () => {
    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER}/api/v1/user/remove-all-test-builds`,
      {
        gameOwner: user._id,
      }
    );

    if (data.success) {
      toast({
        title: data.message,
        variant: "top-accent",
        status: "success",
        isClosable: true,
      });
    } else {
      toast({
        title: data.message,
        variant: "top-accent",
        status: "error",
        isClosable: true,
      });
    }
  };

  // Handle Start Game
  const handleStartGame = () => {
    console.log("Start Game");
    setShowGame(true);
  };
  // Handle Stop Game
  const handleStopGame = () => {
    console.log("Stop Game");
    setShowGame(false);
  };

  useEffect(() => {
    if (data && framework && loader && wasm) {
      // Check if gamename already present
      const gamenameAlreadyPresentData = ifGamenameAlreadyPrsent();
      if (!gamenameAlreadyPresentData.success) {
        toast({
          title: `Build already present with same name`,
          variant: "top-accent",
          status: "info",
          isClosable: true,
        });
        return;
      }
      getPresignedUrlUploadToS3(data);
      getPresignedUrlUploadToS3(framework);
      getPresignedUrlUploadToS3(loader);
      getPresignedUrlUploadToS3(wasm);
    }
  }, [data, framework, loader, wasm]);

  useEffect(() => {
    if (dataFile && frameworkFile && loaderFile && wasmFile) {
      saveFilesInfoToDB();
      dispatch(setBuildFolder(true));
      fetchAllTestBuilds();
    }
  }, [dataFile, frameworkFile, loaderFile, wasmFile]);

  // Handle OnSelectTestBuild
  const handleOnSelectGame = async (e) => {
    const selectedTestId = e.target.value;
    const selectedTestBuild = testBuilds.find(
      (testBuild) => testBuild._id === selectedTestId
    );
    console.log(selectedTestBuild);

    if (selectedTestBuild) {
      await dispatch(setDataFile(selectedTestBuild.dataFile));
      await dispatch(setFrameworkFile(selectedTestBuild.frameworkFile));
      await dispatch(setLoaderFile(selectedTestBuild.loaderFile));
      await dispatch(setWasmFile(selectedTestBuild.wasmFile));
      setDisplayGameName(selectedTestBuild.gamename);
    }
  };

  useEffect(() => {
    const userInfo = Cookies.get("userInfo");
    if (userInfo) {
      dispatch(setUser(JSON.parse(userInfo)));
    } else {
      setUser(null);
      navigate("/");
    }
  }, []);
  useEffect(() => {
    fetchAllTestBuilds();
  }, [user]);

  useState(() => {
    console.log("1");
    setMessagesFromUnity(() => [...messagesFromUnity, messageFromUnity]);
    console.log("2");
  }, [messageFromUnity]);

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
        justifyContent={["space-between", "center"]}
        gap={22}
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
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          width={"100%"}
        >
          <Select
            width={{ sm: "92%", lg: "83%" }}
            placeholder="Select from revious builds"
            onChange={(e) => handleOnSelectGame(e)}
            cursor={"pointer"}
          >
            {testBuilds.map((testBuild) => (
              <option
                key={testBuild._id}
                value={testBuild._id}
                style={{ cursor: "pointer" }}
              >
                {testBuild.gamename}
              </option>
            ))}
          </Select>
        </Box>
        <Divider />
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Button>
            Add new build <StatDownArrow />
          </Button>
          <Input
            value={gamename}
            onChange={(e) => setGamename(e.target.value)}
            required={true}
            placeholder="Enter your game name"
            padding={"0.1rem 0.6rem"}
            margin={"0.1rem auto"}
            width={{ sm: "70%", lg: "83%" }}
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
            marginTop={["1rem"]}
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

          <Button
            leftIcon={<DeleteIcon />}
            colorScheme="red"
            onClick={handleDeleteMyBuilds}
          >
            Remove My All Builds
          </Button>
        </Box>
      </Box>
      {/* Game Screen */}
      <Box height={"100%"} width={"100%"} padding={"1rem"}>
        {/* Game will be visible here */}
        <Heading>{displayGameName}</Heading>
        <Box
          id="gameSectionWindow"
          height={"83vh"}
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
            <></>
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
        {/* Start, Stop, Restart game */}
        <Box display={"flex"} justifyContent={"center"} gap={11} padding={1}>
          <Button
            disabled={buildFolder ? false : true}
            onClick={
              buildFolder
                ? handleStartGame
                : () =>
                    toast({
                      title: `Upload your build folder first`,
                      variant: "top-accent",
                      status: "warning",
                      isClosable: true,
                    })
            }
            colorScheme={buildFolder ? "green" : "red"}
          >
            {!showGame ? "Start Game" : "GameRunning"}
          </Button>

          <Button
            disabled={buildFolder ? false : true}
            onClick={
              buildFolder
                ? handleStopGame
                : () =>
                    toast({
                      title: `Upload your build folder first`,
                      variant: "top-accent",
                      status: "warning",
                      isClosable: true,
                    })
            }
            colorScheme={buildFolder ? "green" : "red"}
          >
            Stop Game
          </Button>
        </Box>
        {/* Game success messages will be seen here */}
        <Box
          height={"20vh"}
          borderRadius={"6px"}
          marginTop={"1rem"}
          padding={"1rem"}
          boxShadow={"0 0 6px 1px black"}
        >
          {messagesFromUnity &&
            messagesFromUnity.map((msg, index) => (
              <Input
                key={index}
                placeholder="You can see messags from unity here on successfull integration."
                value={msg}
                readOnly={true}
              ></Input>
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default TestIntegration;
