import { Box } from "@chakra-ui/react";
import React from "react";
import GameCategoryRow from "../components/gameCategoryRow/GameCategoryRow";

const AllGames = () => {
  return (
    <Box className="allGames" minHeight={"100vh"} my={"2vh"}>
      <GameCategoryRow />
      <GameCategoryRow />
      <GameCategoryRow />
    </Box>
  );
};

export default AllGames;
