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
import gokuImg from "../assets/images/goku1.jpeg";
import React from "react";
import GameCategoryRow from "../components/gameCategoryRow/GameCategoryRow";

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
            src={gokuImg}
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
      <Box>
        <Tabs isFitted variant="enclosed">
          <TabList>
            <Tab>Submit Activities</Tab>
            <Tab>Your Streams</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <GameCategoryRow />
            </TabPanel>
            <TabPanel>
              <GameCategoryRow />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default Account;
