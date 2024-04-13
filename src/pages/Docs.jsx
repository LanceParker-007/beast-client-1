import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";

const Docs = () => {
  return (
    <Box
      minHeight={"100vh"}
      paddingY={10}
      paddingX={{ base: "1rem", sm: "2rem", lg: "11rem" }}
    >
      <Box mb={"2rem"}>
        <Heading fontSize={["40", "60"]} fontFamily={"Jockey One"}>
          How to use the PlayBrutal Package in your game.
        </Heading>
      </Box>
      <Text fontFamily={"DM Monospace, monospace"}>
        Hi fellow developer, these are docs through which you can set the
        connection between your game and PlayBrutal. It’s very easy 😁
      </Text>
      <Text color={"red"} fontSize={11}>
        *Note: Only unity webgl games supported as of now
      </Text>

      <Box>
        {/* Intro */}
        <Box mt={"2rem"}>
          <Heading fontFamily={"Jockey One"}>Install the package 🚀</Heading>
          <Text fontFamily={"DM Monospace, monospace"} mt={2}>
            Please contact us through the Contact Us page we will share the
            package with you.
          </Text>
          <Text fontFamily={"DM Monospace, monospace"} mt={2}>
            As soon as you install the package it will create an empty object in
            your project named “ourGameObjectName”. Now you will be able to use
            the methods through which your game and PlayBrutal can talk.
          </Text>
        </Box>

        {/* Message from Unity to React */}
        <Box mt={"2rem"}>
          <Heading fontFamily={"Jockey One"}>
            Methods to send information to PlayBrutal 🚀
          </Heading>
          <Text fontFamily={"DM Monospace, monospace"} mt={2}>
            So there few methods in our package which you need to use/implement
            in your game.
          </Text>
          <Box fontFamily={"DM Monospace, monospace"} mt={2}>
            <Text fontFamily={"Jockey One"}>▶️ SendUserGameId</Text>
            <br />
            So we use need the game to send PlayBrutal a unique id of of the
            player
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Docs;
