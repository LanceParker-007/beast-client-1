import { Box, HStack, Heading, Text } from "@chakra-ui/react";
import React from "react";
import MainCard from "../mainCard/MainCard";
// import { image } from "../../useAssets/useAssets";
import { useSelector } from "react-redux";

const cardHeading = "Drift Max Pro Car Racing Game";
const cardSubHeading = "Racing";

const CardRow = ({
  rowHeading = "Discover top picks",
  rowSubHeading = "Earn real cash by playing simple games",
  cardsArray = new Array(2).fill(null) || [1, 2],
}) => {
  const { user } = useSelector((state) => state.authSliceReducer);

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
          justifyContent={"flex-start"}
          css={{ "&::-webkit-scrollbar": { height: "8px" } }}
        >
          {cardsArray.map((game, index) => (
            <MainCard
              key={index}
              cardHeading={game?.gamename || cardHeading}
              cardSubHeading={"2 Player Shooting Game" || cardSubHeading}
              gameThumbnailLargeSrc={game?.gameImage}
              gameThumbnailSmallSrc={game?.gameImage}
              cardLink={`/games/${user._id}/${game?._id}`}
            />
          ))}
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
