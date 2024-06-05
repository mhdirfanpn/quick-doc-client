/* eslint-disable */ 
import React from 'react'
import { Box, Heading, Flex, Avatar } from "@chakra-ui/react";
import jwtDecode from 'jwt-decode';
const ChatAvatar = () => {
  
  // let chatterId;
  
  // if(isDoctor){
  //   //find userID for avatar and name
  // }else{
  //   //find doctorID for avatar and name
  // }



  return (
    <Box position="fixed" bg={"whiteAlpha.900"} w={'40%'} mt={"72px"}>
        <Flex alignItems="center" mt={1}> 
          <Avatar size="md" name="John Doe" src="https://bit.ly/dan-abramov" />
          <Box ml="4">
            <Heading as="h2" fontSize="lg" mt={6}>
              John Doe
            </Heading>
            <Box fontSize="sm" color="gray.500">
              Online
            </Box>
          </Box>
        </Flex>
        </Box>
  )
}

export default ChatAvatar