import { Box } from "@chakra-ui/react";
import React from "react";
import CardRow from "../components/cardRow/CardRow";

const AllGames = () => {
  return (
    <Box className="allGames" minHeight={"100vh"} my={"11vh"}>
      <CardRow />
      <CardRow />
      <CardRow />
    </Box>
  );
};

export default AllGames;
