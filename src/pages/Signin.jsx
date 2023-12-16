import React from "react";
import SignInWithGoogleButton from "../components/SignInWithGoogleButton/SignInWithGoogleButton";
import { Box } from "@chakra-ui/react";

const Signin = () => {
  return (
    <Box
      minH={"80vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box
        className="signInButtonContainer"
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <SignInWithGoogleButton />
      </Box>
    </Box>
  );
};

export default Signin;
