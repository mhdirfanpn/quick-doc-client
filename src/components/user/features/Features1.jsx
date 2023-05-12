import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  IoAnalyticsSharp,
  IoLogoBitcoin,
  IoSearchSharp,
} from "react-icons/io5";

const Feature = ({ text, icon, iconBg }) => {
  return (
    <Stack direction={"row"} align={"center"}>
      <Flex
        w={8}
        h={8}
        align={"center"}
        justify={"center"}
        rounded={"full"}
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};

export default function Features() {
  return (
    <Container maxW={"8xl"} py={12} mt={32}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stack spacing={4}>
          <Text
            textTransform={"uppercase"}
            color={"blue.400"}
            fontWeight={600}
            fontSize={"sm"}
            bg={useColorModeValue("blue.50", "blue.900")}
            p={2}
            alignSelf={"flex-start"}
            rounded={"md"}
          >
            Our Story
          </Text>
          <Heading>A digital health care agency</Heading>
          <Text color={"gray.500"} fontSize={"lg"}>
            we ensures to provide the highest quality of
            care and a transformative experience for all your healthcare needs.
            {/* Our multi-specialty hospital equipped with specialised doctors, and
            world-class technology, bring global standards of medical care to
            our patients. */}
          </Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.100", "gray.700")}
              />
            }
          >
            <Feature
              icon={
                <Icon as={IoAnalyticsSharp} color={"yellow.500"} w={5} h={5} />
              }
              iconBg={useColorModeValue("yellow.100", "yellow.900")}
              text={"Better Care"}
            />
            <Feature
              icon={<Icon as={IoSearchSharp} color={"green.500"} w={5} h={5} />}
              iconBg={useColorModeValue("green.100", "green.900")}
              text={"Specialised Doctors"}
            />
            <Feature
              icon={
                <Icon as={IoLogoBitcoin} color={"purple.500"} w={5} h={5} />
              }
              iconBg={useColorModeValue("purple.100", "purple.900")}
              text={"Affordable Plans"}
            />
          </Stack>
        </Stack>
        <Flex>
          <Image
            rounded={"md"}
            alt={"feature image"}
            src={
              "https://img.freepik.com/free-photo/happy-laughing-female-doctors-hospital-gowns-row_186202-2186.jpg?w=996&t=st=1681995145~exp=1681995745~hmac=e3b933454fbdaa34d291f6ba0fde2920bf5a3e7a3937aa020042e2e619ee1f51"
            }
            objectFit={"cover"}
          />
        </Flex>
      </SimpleGrid>
    </Container>
  );
}
