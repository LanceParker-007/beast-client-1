import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { RiSendPlaneLine } from "react-icons/ri";

const ContactUs = () => {
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

  useEffect(() => {
    const cursor = document.querySelector(".cursor");

    cursor.addEventListener("click", (e) => {
      cursor.classList.add("expand");
      setTimeout(() => {
        cursor.classList.remove("expand");
      }, 500);
    });
  });

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
      <VStack>
        <Heading>Contact us</Heading>
        <Text>We'd love to hear from you!</Text>

        <Box p={2} fontWeight={400}>
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
            <FormLabel mb={0}>Your Message</FormLabel>
            <Textarea
              backgroundColor={"white"}
              name="message"
              placeholder="Please enter your message here"
              value={user.message}
              onChange={handleContactUsForm}
              size="sm"
              minH={200}
              resize={"none"}
              color={"#5F6368"}
            />
          </FormControl>
        </Box>

        <button className="button-css cursor" onClick={handleOnSubmit}>
          <Text fontSize={14} fontWeight={500}>
            Send{" "}
          </Text>
          <Box mx={2}>
            <RiSendPlaneLine size={20} />
          </Box>
        </button>
      </VStack>
    </Box>
  );
};

export default ContactUs;
