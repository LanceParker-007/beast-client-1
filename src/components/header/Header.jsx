import React, { useEffect, useState } from "react";
import { Button, HStack, Heading, useDisclosure } from "@chakra-ui/react";
import { RiMenu5Fill } from "react-icons/ri";
import Navbar from "../Drawer/Drawer";
import { Link } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        background={"white"}
        boxShadow={isScrolled ? "0 0 10px rgba(0, 0, 0, 0.6)" : "none"}
        transition="box-shadow 0.3s, margin-botttom: 0.3s"
      >
        <Link to={"/"}>
          <Heading fontFamily={"Jockey One"} color={"black"}>
            PlayBrutal
          </Heading>
        </Link>

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
      <Navbar isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Header;
