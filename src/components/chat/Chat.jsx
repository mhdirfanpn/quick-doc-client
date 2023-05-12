import { Box, Stack } from "@chakra-ui/react";
import React from "react";
import { format } from "timeago.js";

const Chat = ({ message, own }) => {
  return (
    <Box
      display="flex"
      flexDirection={own ? "row-reverse" : "row"}
      alignItems="flex-end"
      mb="4"
    >
      <Stack spacing="4" mt={9}>
        <Box
          bg={own ? "blue.400" : "gray.200"}
          p="2"
          borderRadius="md"
          alignSelf={own ? `flex-start` : `flex-end`}
        >
          <Box fontSize="sm" color={own ? "whiteAlpha.800" : "grey.200"}>
            {format(message.createdAt)}
          </Box>
          <Box color={own ? `white` : `black`}>{message.text}</Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default Chat;
