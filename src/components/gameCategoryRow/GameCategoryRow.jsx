import { Box, HStack, Heading, Text } from "@chakra-ui/react";
import React from "react";
import GameCard from "../gameCard/GameCard";

const GameCategoryRow = ({ categoryHeading }) => {
  return (
    <Box className="gameCategoryRow" h={"400px"} mb={14}>
      <Box w={"100%"} height={"14%"} px={"3vw"} mb={[1, 5]}>
        <Heading fontSize={"x-large"} color={"#202124"}>
          Discover top picks
        </Heading>
        <Text color={"#5F6368"}>Earn real cash by playing simple games</Text>
      </Box>
      <Box w={"100%"} height={"86%"}>
        <HStack
          minH={"40vh"}
          w={"100%"}
          overflowX={"auto"}
          px={"3vw"}
          justifyContent={"space-between"}
          css={{ "&::-webkit-scrollbar": { height: "8px" } }}
        >
          <GameCard />
          <GameCard />
          <GameCard />
          <GameCard />
          <GameCard />
          <GameCard />
          <Text
            _hover={{
              backgroundColor: "#F5F5F5",
              cursor: "pointer",
            }}
            py={2}
            px={6}
            borderRadius={10}
          >
            more coming soon...
          </Text>
        </HStack>
      </Box>
    </Box>
  );
};

export default GameCategoryRow;
