import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import {
  TiSocialYoutubeCircular,
  TiSocialInstagramCircular,
} from "react-icons/ti";
import { Link } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      className="footer"
      bg={"white"}
      minHeight={"60vh"}
      width={"100%"}
      color={"#5F6368"}
      marginTop={["16rem", "12rem"]}
    >
      <Box
        m={"6vh 3vw"}
        border={"1px solid rgb(232,234,237)"}
        h={"0.1vh"}
      ></Box>

      <VStack
        height={["20vh", "40vh"]}
        m={"0 3vw"}
        gap={10}
        alignItems={"flex-start"}
      >
        <VStack alignItems={"flex-start"}>
          <Text fontSize={"1.2rem"} fontWeight={500} fontFamily={"Jockey One"}>
            PlayBrutal
          </Text>
          <Link to={"/terms-of-service"} fontSize={".875rem"} fontWeight={400}>
            Terms of Service
          </Link>
          <Link to={"/privacy-policy"} fontSize={".875rem"} fontWeight={400}>
            Privacy
          </Link>
          <Link to={"/#about-us"} fontSize={".875rem"} fontWeight={400}>
            About PlayBrutal
          </Link>
          <Link to={"/developers"} fontSize={".875rem"} fontWeight={400}>
            Developers
          </Link>
        </VStack>

        <VStack alignItems={"flex-start"} width={"full"}>
          <Text fontSize={"1.2rem"} fontWeight={500}>
            All Rights Reserved
          </Text>
          <Text fontSize={"1rem"} fontWeight={400}>
            @PlayBrutal
          </Text>
          <Text
            display={"flex"}
            alignItems={"center"}
            fontSize={"1rem"}
            fontWeight={400}
          >
            <Box w={"24px"} h={"18px"} mr={2}>
              <Image
                src={
                  "https://ssl.gstatic.com/store/images/regionflags/india.png"
                }
                alt="Indian Flag"
                boxSize={"100%"}
              />
            </Box>
            India (English (United States))
          </Text>
        </VStack>

        <HStack color={"blackalpha.900"} fontSize={50} p={0}>
          <ChakraLink
            href="https://www.youtube.com/"
            target="_blank"
            rel="noreferrer"
            _hover={{
              color: "black",
            }}
          >
            <TiSocialYoutubeCircular />
          </ChakraLink>
          <ChakraLink
            href="https://www.youtube.com/"
            target="_blank"
            rel="noreferrer"
            _hover={{
              color: "black",
            }}
          >
            <TiSocialInstagramCircular />
          </ChakraLink>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Footer;
