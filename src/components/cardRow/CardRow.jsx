import { Box, HStack, Heading, Text } from "@chakra-ui/react";
import React from "react";
import MainCard from "../mainCard/MainCard";
import { image } from "../../useAssets/useAssets";

const CardRow = ({
  rowHeading = "Discover top picks",
  rowSubHeading = "Earn real cash by playing simple games",
  cardHeading = "Drift Max Pro Car Racing Game",
  cardSubHeading = "Racing",
}) => {
  return (
    <Box className="cardRow" mb={14}>
      <Box w={"100%"} height={"14%"} px={"3vw"} mb={[1, 5]}>
        <Heading fontSize={"x-large"} color={"#202124"}>
          {rowHeading}
        </Heading>
        <Text color={"#5F6368"}>{rowSubHeading}</Text>
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
          <MainCard
            cardHeading={cardHeading}
            cardSubHeading={cardSubHeading}
            gameThumbnailLargeSrc={image.clickWar}
            gameThumbnailSmallSrc={image.clickWar}
            cardLink="/games/click-war"
          />

          <MainCard
            cardHeading={cardHeading}
            cardSubHeading={cardSubHeading}
            gameThumbnailLargeSrc={image.clickWarsBattleRoyal}
            gameThumbnailSmallSrc={image.clickWarsBattleRoyal}
          />
          <MainCard
            cardHeading={cardHeading}
            cardSubHeading={cardSubHeading}
            gameThumbnailLargeSrc={image.clickWarsFight}
            gameThumbnailSmallSrc={image.clickWarsFight}
          />
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

export default CardRow;
