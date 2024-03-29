import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../../redux/slices/authSlice";
import Cookies from "js-cookie";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { RiLogoutBoxLine } from "react-icons/ri";
// import SignInWithGoogleButton from "../signInWithGoogleButton/SignInWithGoogleButton.jsx";

// SignInWithGoogleButton created here only because getting some error when importing from the other file
const SignInWithGoogleButton = ({ ...props }) => {
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
            expires: 1,
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

//Remember to DeStructure
const LinkButton = ({ url = "/", title = "Home", onClose }) => {
  return (
    <>
      {title === "About" ? (
        <a onClick={onClose} href="/#about-us">
          <Button variant={"outline"}>{title}</Button>
        </a>
      ) : (
        <Link onClick={onClose} to={url}>
          <Button variant={"outline"}>{title}</Button>
        </Link>
      )}
    </>
  );
};

const Navbar = ({ isOpen, onClose }) => {
  return (
    <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth={"1px"}>PlayBrutal</DrawerHeader>
        <DrawerBody mt={4}>
          <VStack spacing={"4"} alignItems={"flex-start"}>
            {/* <LinkButton onClose={onClose} url={"/"} title={"Home"} /> */}
            {/* <LinkButton
              onClose={onClose}
              url={"/games"}
              title={"Browse All Games"}
            /> */}
            <LinkButton onClose={onClose} url={"/docs"} title={"Docs"} />
            <LinkButton
              onClose={onClose}
              url={"/test-your-game"}
              title={"Test Your Game"}
            />
            <LinkButton
              onClose={onClose}
              url={"/contact-us"}
              title={"Contact Us"}
            />
            {/* <LinkButton onClose={onClose} url={"/#about-us"} title={"About"} /> */}

            <HStack justifyContent={"center"} mt={20} width={"100%"}>
              <SignInWithGoogleButton />
            </HStack>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default Navbar;
