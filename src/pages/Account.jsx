import {
  Avatar,
  Box,
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React from "react";
import CardRow from "../components/cardRow/CardRow";
import { image } from "../useAssets/useAssets";

const Account = () => {
  return (
    <Box
      padding={1.1}
      borderRadius={11}
      display={"flex"}
      flexDirection={"column"}
      gap={11}
    >
      {/* First section */}
      <Box
        display={"flex"}
        flexDirection={{ base: "column", md: "row", lg: "row" }}
        justifyContent={"center"}
        alignItems={"center"}
        marginTop={11}
      >
        <Box
          height={"200px"}
          width={{ base: "100%", md: "40%", lg: "20%" }}
          padding={11}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Avatar
            src={image.demoProfilePic}
            alt="profile image"
            height={"190px"}
            width={"190px"}
          />
        </Box>
        <Box
          minHeight={"200px"}
          width={{ base: "100%", md: "40%", lg: "20%" }}
          padding={11}
          display={{ base: "flex", md: "", lg: "" }}
          flexDirection={"column"}
          gap={11}
        >
          <Button>Firstname Lastname</Button>
          <Button>Edit Profile</Button>
          <Button>Help and Support</Button>
          <Button>Schedule a Stream</Button>
        </Box>
      </Box>

      {/* Second section */}
      <Box height={"100%"}>
        <Tabs isFitted variant="enclosed">
          <TabList>
            <Tab>Submit Activities</Tab>
            <Tab>Your Streams</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <CardRow ti />
            </TabPanel>
            <TabPanel>
              <CardRow />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default Account;
