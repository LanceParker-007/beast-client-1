import React from "react";
import "./signInWithGoogleButton.scss";
import { useToast } from "@chakra-ui/react";
import { devServer } from "../..";
import axios from "axios";

const SignInWithGoogleButton = ({ ...props }) => {
  const toast = useToast();

  const handleSignIn = async () => {
    try {
      window.open(`${devServer}/auth/google`, "_self");

      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      type="button"
      className="login-with-google-btn"
      {...props}
      onClick={handleSignIn}
    >
      Sign in with Google
    </button>
  );
};

export default SignInWithGoogleButton;
