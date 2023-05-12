import { Box, Heading, Container, Text, Button, Stack } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate();
  return (
    <>
      <Container maxW={"3xl"}>
        <Stack
          as={Box}
          mt={24}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Box mx="auto">
            <CheckCircleIcon boxSize={"50px"} color={"green.500"} />
          </Box>
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            <Text as={"span"} color={"blue.400"}>
              Your booking has been successfully completed.
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            Monetize your content by charging your most loyal readers and reward
            them loyalty points. Give back to your loyal readers by granting
            them access to your pre-releases and sneak-peaks.
          </Text>
          <Box mx="auto">
            <Button color={"blue.400"} onClick={() => navigate("/")}>
              Back to Home
            </Button>
          </Box>
        </Stack>
      </Container>
    </>
  );
}
