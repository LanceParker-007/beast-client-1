import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import ResultTable from "../components/resultTable/ResultTable";
import ClickRoyal from "./Games/ClickRoyal";

const GameScreen = ({ children }) => {
  const { gameId } = useParams();
  console.log(gameId);

  return (
    <Box>
      {/* Game Screen; (A game should be embeded here) */}
      <Box>
        <ClickRoyal />
      </Box>
      {/* Results Screen */}
      <Box paddingX={[2, 10, 10, 20, 40, 50]} marginX={[0, 20]}>
        <Heading fontFamily={"Jockey One"}>Rankings</Heading>
        <ResultTable />

        {/* ---Game-screen footer */}
        <Text>
          <span style={{ color: "red" }}>Note:</span> We will contact you to
          send rewards.
        </Text>
      </Box>
    </Box>
  );
};

export default GameScreen;
