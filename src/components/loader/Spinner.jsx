import React from "react";
import { Stack } from "@chakra-ui/react";

const Spinner = () => {
  return (
    <Stack direction="row" spacing={4}>
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </Stack>
  );
};

export default Spinner;
