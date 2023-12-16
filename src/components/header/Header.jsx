import React from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Heading,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { RiMenu5Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

//Remember to DeStructure
const LinkButton = ({ url = "/", title = "Home", onClose }) => {
  return (
    <>
      <Link onClick={onClose} to={url}>
        <Button variant={"outline"}> {title}</Button>
      </Link>
    </>
  );
};

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <HStack justifyContent={"space-between"} p={"2vh 2vw"} zIndex={10}>
        <Heading fontFamily={"Jockey One"} color={"black"}>
          PlayBrutal
        </Heading>
        <Button
          bg={"white"}
          color={"black"}
          width={"12"}
          height={"12"}
          rounded={"full"}
          onClick={onOpen}
          margin={"4px"}
          _hover={{
            boxShadow:
              "0 -1px 0 rgba(0, 0, 0, 0.04), 0 1px 1px rgba(0, 0, 0, 0.25)",
          }}
        >
          <RiMenu5Fill size={"24vh"} />
        </Button>
      </HStack>

      {/* Drawer */}
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth={"1px"}>PlayBrutal</DrawerHeader>
          <DrawerBody mt={4}>
            <VStack spacing={"4"} alignItems={"flex-start"}>
              <LinkButton onClose={onClose} url={"/"} title={"Home"} />
              <LinkButton
                onClose={onClose}
                url={"/games"}
                title={"Browse All Games"}
              />
              <LinkButton
                onClose={onClose}
                url={"/contact"}
                title={"Contact Us"}
              />
              <LinkButton onClose={onClose} url={"/about"} title={"About"} />
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;
