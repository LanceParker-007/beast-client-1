import {
  Box,
  Card,
  CardBody,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const GameCard = ({ gameTitle, gameCategory, cardLink = "", ...props }) => {
  return (
    <div>
      <Card boxShadow={"none"} p={0}>
        <Link to={cardLink}>
          <CardBody
            w={["354px", "425px"]}
            h={["311px", "340px"]}
            p={0}
            borderRadius={10}
            _hover={{
              boxShadow:
                "0 -1px 0 rgba(0, 0, 0, 0.04), 0 1px 1px rgba(0, 0, 0, 0.25)",
              backgroundColor: "#F5F5F5",
              transition: "background-color 0.4s, box-shadow 0.4s",
            }}
            {...props}
          >
            <VStack w={"100%"} h={"100%"} px={2} pt={2} pb={4}>
              <Box p={0} h={"80%"} w={"100%"}>
                <Image
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                  alt="Green double couch with wooden legs"
                  borderRadius="lg"
                  boxSize={"100%"}
                  objectFit={"cover"}
                />
              </Box>
              <HStack justifyContent={"flex-start"} w={"100%"} h={"20%"}>
                <Box w={"56px"} h={"56px"}>
                  <Image
                    src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                    alt="Green double couch with wooden legs"
                    borderRadius={10}
                    boxSize={"100%"}
                  />
                </Box>

                <VStack w={"80%"} alignItems={"flex-start"} gap={0}>
                  <Heading fontSize={"100%"} color={"#202124"}>
                    {gameTitle}
                  </Heading>
                  <Text fontSize={"smaller"} color={"#5F6368"}>
                    {gameCategory}
                  </Text>
                </VStack>
              </HStack>
            </VStack>
          </CardBody>
        </Link>
      </Card>
    </div>
  );
};

export default GameCard;
