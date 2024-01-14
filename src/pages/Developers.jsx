import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
  Textarea,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { RiGamepadFill, RiReactjsFill, RiRocket2Fill } from "react-icons/ri";

const Developers = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    mobileNumber: "",
    message: "",
  });

  const handleContactUsForm = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log("Send Us");
  };

  return (
    <Box
      minH={"100vh"}
      p={2}
      backgroundImage={`url(
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1462889/pat-back.svg"
    )`}
      backgroundPosition={"center"}
      backgroundRepeat={"repeat"}
      backgroundSize={"7%"}
    >
      <VStack mt={6}>
        <VStack textAlign={"center"}>
          <Text fontSize={"lg"}>
            Are you an
            <Tooltip
              hasArrow
              placement="top"
              label={<RiReactjsFill />}
              bg={"#5ED3F3"}
              color={"white"}
            >
              <span className="blink" style={{ marginLeft: 2, marginRight: 2 }}>
                WEBAPP
              </span>
            </Tooltip>
            or
            <Tooltip
              hasArrow
              placement="top"
              label={<RiGamepadFill />}
              bg={"#EDA63F"}
              color={"white"}
            >
              <span className="blink" style={{ marginLeft: 2, marginRight: 2 }}>
                Game
              </span>
            </Tooltip>
            developer?
          </Text>
          <Text>We'd like you to work with us!</Text>
          <Text>Get FREEDOM to unleash your creativity 🙌</Text>
        </VStack>
        <Box p={2} fontWeight={400} mt={6}>
          <FormControl isRequired mb={2}>
            <FormLabel mb={0}>Your Name</FormLabel>
            <Input
              bgColor={"white"}
              color={"#5F6368"}
              placeholder="Your name please"
              name="username"
              value={user.username}
              onChange={handleContactUsForm}
            />
          </FormControl>
          <HStack>
            <FormControl isRequired mb={2}>
              <FormLabel mb={0}>Email</FormLabel>
              <Input
                bgColor={"white"}
                color={"#5F6368"}
                placeholder="abc@email.com"
                name="email"
                value={user.email}
                onChange={handleContactUsForm}
              />
            </FormControl>
            <FormControl isRequired mb={2}>
              <FormLabel mb={0}>Mobile Number</FormLabel>
              <Input
                bgColor={"white"}
                color={"#5F6368"}
                placeholder="+91 69xxxxxx69"
                name="mobileNumber"
                value={user.mobileNumber}
                onChange={handleContactUsForm}
              />
            </FormControl>
          </HStack>

          <FormControl isRequired mb={2}>
            <FormLabel mb={0}>Your Work</FormLabel>
            <Textarea
              backgroundColor={"white"}
              name="message"
              placeholder="Describe your work or share the links of your work here..."
              value={user.message}
              onChange={handleContactUsForm}
              size="sm"
              minH={200}
              resize={"none"}
              color={"#5F6368"}
            />
          </FormControl>
        </Box>

        <Button
          colorScheme={"yellow"}
          rightIcon={<RiRocket2Fill size={20} />}
          onClick={handleOnSubmit}
        >
          Watch Me{" "}
        </Button>
      </VStack>
    </Box>
  );
};

export default Developers;
