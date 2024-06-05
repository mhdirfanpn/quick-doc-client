/* eslint-disable */ 
import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import { GET_DOCTOR } from "../../../utils/ConstUrls";

export default function ViewDoctor() {
  const [doctor, setDoctor] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("userToken");

  useEffect(() => {
    getDoctorsDetails();
  }, []);

  const getDoctorsDetails = async () => {
    axios
      .get(`${GET_DOCTOR}/${params.doctorId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setDoctor(response.data.doctor);
      })
      .catch((err) => {
        navigate('/error')
      });
  };

  const checkAvailability = (id) => {
    navigate(`/checkAvailability/${id}`, { state: { doctor } });
  };

  return (
    <Container maxW={"5xl"} py={12} mt={24}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stack spacing={4}>
          <Heading>Dr. {doctor.fullName}</Heading>
          <Text color={"gray.500"} fontSize={"lg"}>
            {doctor.specialization}
          </Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.100", "gray.700")}
              />
            }
          >
            <Text color={"gray.500"} fontSize={"lg"}>
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old. Richard McClintock, a Latin
              professor.
            </Text>
            <Button
              /* flex={1} */
              px={4}
              fontSize={"sm"}
              rounded={"full"}
              bg={"blue.400"}
              color={"white"}
             
              onClick={() => checkAvailability(doctor._id)}
            >
              Check availability
            </Button>
          </Stack>
        </Stack>
        <Flex>
          <Image
            rounded={"md"}
            alt={"feature image"}
            src={doctor.profilePic}
            objectFit={"cover"}
          />
        </Flex>
      </SimpleGrid>
    </Container>
  );
}
