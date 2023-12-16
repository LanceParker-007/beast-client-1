import { Box, HStack, Heading, Stack, VStack } from "@chakra-ui/react";
import {
  TiSocialYoutubeCircular,
  TiSocialInstagramCircular,
} from "react-icons/ti";
import { DiGithub } from "react-icons/di";

const Footer = () => {
  return (
    <Box
      padding={4}
      bg={"blackAlpha.900"}
      minHeight={"10vh"}
      width={"100%"}
      p={"2vh 6vw"}
    >
      <Stack
        direction={["column", "row"]}
        justifyContent={"space-between"}
        height={["20vh", "10vh"]}
      >
        <VStack alignItems={["center", "flex-start"]} width={"full"}>
          <Heading
            fontSize={"1.6rem"}
            children={"All Rights Reserved"}
            color={"white"}
          />
          <Heading
            // fontFamily={"body"}
            fontSize={"sm"}
            children={"@PlayBrutal"}
            color={"yellow.400"}
          />
        </VStack>
        <HStack
          spacing={[2, 6]}
          justifyContent={["center", "space-between"]}
          color={"white"}
          fontSize={50}
          alignItems={"flex-start"}
        >
          <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
            <TiSocialYoutubeCircular />
          </a>
          <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
            <TiSocialInstagramCircular />
          </a>
          <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
            <DiGithub />
          </a>
        </HStack>
      </Stack>
    </Box>
  );
};

export default Footer;
