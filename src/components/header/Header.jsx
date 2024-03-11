import React, { useEffect, useState } from "react";
import { Button, HStack, Heading, useDisclosure } from "@chakra-ui/react";
import { RiAccountCircleFill, RiMenu5Fill } from "react-icons/ri";
import Navbar from "../navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const handleScroll = () => {
    const scrollPercentage = (window.scrollY / window.innerHeight) * 100;
    setIsScrolled(scrollPercentage > 2 ? true : false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <HStack
        justifyContent={"space-between"}
        h={"11vh"}
        p={"2vw"}
        zIndex={isScrolled ? 50 : "auto"}
        position={"fixed"}
        top={0}
        width="100%"
        background={isScrolled ? "white" : "black"}
        color={isScrolled ? "white" : "black"}
        boxShadow={
          isScrolled
            ? "0 0 11px rgba(0, 0, 0, 0.6)"
            : "0 0 2px rgba(0, 0, 0, 0.6)"
        }
        transition="all .6s"
      >
        <Link to={"/"}>
          <Heading
            fontFamily={"Jockey One"}
            color={isScrolled ? "black" : "white"}
          >
            PlayBrutal
          </Heading>
        </Link>

        <HStack>
          <Button
            bg={isScrolled ? "#FBFBFF" : "black"}
            color={isScrolled ? "black" : "white"}
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
          <Button
            bg={isScrolled ? "#FBFBFF" : "black"}
            color={isScrolled ? "black" : "white"}
            width={"12"}
            height={"12"}
            rounded={"full"}
            onClick={() => {
              navigate("/manage-account");
            }}
            margin={"4px"}
            _hover={{
              boxShadow:
                "0 -1px 0 rgba(0, 0, 0, 0.04), 0 1px 1px rgba(0, 0, 0, 0.25)",
            }}
          >
            <RiAccountCircleFill />
          </Button>
        </HStack>
      </HStack>

      {/* Drawer */}
      <Navbar isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Header;
