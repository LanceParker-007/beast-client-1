import React from "react";
import "./signInWithGoogleButton.scss";
import { Button, useToast } from "@chakra-ui/react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { setUser } from "../../redux/slices/authSlice";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

const SignInWithGoogleButton = () => {
  const toast = useToast();
  const { user } = useSelector((state) => state.authSliceReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setUser(null));
    Cookies.remove("userInfo");
  };

  return !user ? (
    <GoogleLogin
      onSuccess={async (credentialResponse) => {
        const credentialResponseDecoded = jwtDecode(
          credentialResponse.credential
        );
        const username = credentialResponseDecoded.name;
        const email = credentialResponseDecoded.email;
        const pic = credentialResponseDecoded.picture;

        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };

          const { data } = await axios.post(
            `${process.env.REACT_APP_SERVER}/api/v1/user/signin-with-google`,
            { username, email, pic },
            config
          );

          toast({
            title: "Login successful 👍",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });

          //Saving user in local storage
          dispatch(setUser(data));

          Cookies.set("userInfo", JSON.stringify(data), {
            expires: 7,
          });
          navigate("/");
        } catch (error) {
          // console.log(error);
          toast({
            title: `${error.message}`,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        }
      }}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  ) : (
    <Button variant="ghost" onClick={handleLogout}>
      <RiLogoutBoxLine />
      Logout
    </Button>
  );
};

export default SignInWithGoogleButton;
