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
    dispatch(fetchAllPublicGames({}));
  };

  useEffect(() => {
    fetchAllGames();
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
  }, [failMessage]);

  return (
    <Box className="allGames" minHeight={"100vh"} my={"11vh"}>
      <CardRow />
      <CardRow />
      <CardRow />
    </Box>
  );
};

export default AllGames;
