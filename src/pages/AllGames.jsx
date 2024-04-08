import { Box, useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import CardRow from "../components/cardRow/CardRow";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllPublicGames } from "../redux/actions/gamesSliceActions";

const AllGames = () => {
  const { publicGames, failMessage } = useSelector(
    (state) => state.gamesSliceReducer
  );
  const dispatch = useDispatch();
  const toast = useToast();

  const fetchAllGames = async () => {
    await dispatch(fetchAllPublicGames({}));
  };

  useEffect(() => {
    fetchAllGames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (failMessage) {
      toast({
        title: failMessage,
        variant: "top-accent",
        status: "warning",
        isClosable: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [failMessage]);

  return (
    <Box className="allGames" minHeight={"100vh"} my={"11vh"}>
      <CardRow
        rowHeading="New Games"
        rowSubHeading="Play the newly arrived games"
        cardsArray={publicGames}
      />
      <CardRow
        rowHeading="Trending Games"
        rowSubHeading="Play the newly arrived games"
        cardsArray={publicGames}
      />
      <CardRow
        rowHeading="All Time Favourite Games"
        rowSubHeading="Play the newly arrived games"
        cardsArray={publicGames}
      />
    </Box>
  );
};

export default AllGames;
