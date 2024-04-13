/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-computed-key */
import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Spinner,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { RiSendPlaneLine } from "react-icons/ri";
import emailjs from "@emailjs/browser";
import { useSelector } from "react-redux";

const ContactUs = () => {
  const { user: authUser } = useSelector((state) => state.authSliceReducer);

  const [user, setUser] = useState({
    username: "",
    email: "",
    mobileNumber: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleContactUsForm = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!user.message) {
      toast({
        title: "Enter message!",
        status: "info",
        isClosable: true,
        duration: 2,
      });
      return;
    }
    try {
      setLoading(true);
      emailjs.sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_KEY,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        e.target,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );
      toast({
        title: "Email sent",
        position: "top",
        status: "success",

        duration: 1000,
      });

      setLoading(false);
      setUser(() => ({
        ...user,
        ["mobileNumber"]: "",
        ["message"]: "",
      }));
    } catch (error) {
      toast({
        title: "Some error occured!",
        position: "top",
        status: "error",
        duration: 1000,
      });
      setLoading(false);
    }
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

  useEffect(() => {
    setUser(() => ({
      ...user,
      ["username"]: authUser.username,
      ["email"]: authUser.email,
    }));
  }, [authUser.email, authUser.username]);

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

        {loading ? (
          <Spinner />
        ) : (
          <form onSubmit={handleOnSubmit}>
            <VStack>
              <Box p={2} fontWeight={400}>
                <FormControl isRequired mb={2}>
                  <FormLabel mb={0}>Your Name</FormLabel>
                  <Input
                    bgColor={"white"}
                    color={"#5F6368"}
                    placeholder="Your name please"
                    name="username"
                    value={user.username}
                    readOnly={true}
                    // onChange={handleContactUsForm}
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
                      readOnly={true}
                      // onChange={handleContactUsForm}
                    />
                  </FormControl>
                  <FormControl isRequired={false} mb={2}>
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

              <button className="button-css cursor" type="submit">
                <Text fontSize={14} fontWeight={500}>
                  Send{" "}
                </Text>
                <Box mx={2}>
                  <RiSendPlaneLine size={20} />
                </Box>
              </button>
            </VStack>
          </form>
        )}
      </VStack>
    </Box>
  );
};

export default ContactUs;
