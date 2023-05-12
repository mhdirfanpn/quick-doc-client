import React from "react";
import { useEffect, useState } from "react";
import { Box, Heading, Stack, Flex, Avatar } from "@chakra-ui/react";
import axios from "../../utils/axios";
import { USER_CHAT, DOC_CHAT } from "../../utils/ConstUrls";

const Conversations = ({ conversation, currentUser, isDoctor }) => {
  const [user, setUser] = useState("");

  useEffect(() => {

    const chatterId = conversation.members.find((m) => m !== currentUser);
    const getUser = async () => {
      try {
        if (isDoctor) {
          console.log(chatterId);
          const res = await axios.get(`${USER_CHAT}/${chatterId}`);
          setUser(res.data);
        } else {
          const res = await axios.get(`${DOC_CHAT}/${chatterId}`);
          setUser(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  return (
    <Box mt={4} backgroundColor="gray.100" h={20}>
      <Stack spacing="4">
        <Flex alignItems="center" mt={4} ml={2}>
          <Avatar
            size="md"
            name="John Doe"
            src={
              user.profilePic ? user.profilePic : `https://bit.ly/dan-abramov"`
            }
          />
          <Box ml="4">
            <Heading as="h2" fontSize="lg">
              {isDoctor ? user.userName : `Dr. ${user.fullName}`}
            </Heading>
          </Box>
        </Flex>
      </Stack>
    </Box>
  );
};

export default Conversations;
