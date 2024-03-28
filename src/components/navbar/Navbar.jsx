import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import SignInWithGoogleButton from "../signInWithGoogleButton/SignInWithGoogleButton.jsx";

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
