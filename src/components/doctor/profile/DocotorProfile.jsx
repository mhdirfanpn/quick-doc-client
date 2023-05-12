import {
  Box,
  Avatar,
  Badge,
  Text,
  VStack,
  HStack,
  Flex,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { doctorInstance } from "../../../utils/axios";
import jwtDecode from "jwt-decode";
import { DOC_DETAILS } from "../../../utils/ConstUrls";
import { useNavigate } from "react-router-dom";

function DoctorProfile() {
  useEffect(() => {
    getDoctorsDetails();
  }, []);

  const [doctorDetails, setDoctorDetails] = useState("");
  const navigate = useNavigate();

  const getDoctorsDetails = async () => {
    try {
      const decode = jwtDecode(localStorage.getItem("doctorToken"));
      const response = await doctorInstance.get(`${DOC_DETAILS}/${decode.id}`);
      setDoctorDetails(response.data.doctorDetails);
    } catch (err) {
      console.log(err);
    }
  };

  let imageUrl = doctorDetails.profilePic;

  return (
    <Box
      marginLeft={24}
      marginTop={24}
      bg="white"
      rounded="lg"
      border="1px"
      borderColor="gray.200"
      maxWidth="1400"
      p={4}
      shadow="md"
      dark={{ bg: "gray.800", borderColor: "gray.700" }}
    >
      <Flex justify="space-between" align="center">
        <Avatar src={imageUrl} boxSize={200} borderRadius={10} size="4xl" />

        <EditIcon mt="-90" onClick={() => navigate("/doctor-profile")} />
      </Flex>

      <VStack spacing={1} align="left" mt={6}>
        <Text fontWeight="bold" fontSize="2xl">
          {doctorDetails.fullName}
        </Text>

        <Badge colorScheme="teal">{doctorDetails.specialization}</Badge>
      </VStack>

      <HStack mt="4" spacing={3}>
        <Text fontSize="sm" color="gray.600">
          Email:
        </Text>
        <Text fontSize="sm">{doctorDetails.email}</Text>
      </HStack>

      <HStack mt="4" spacing={3}>
        <Text fontSize="sm" color="gray.600">
          Phone:
        </Text>
        <Text fontSize="sm">{doctorDetails.number}</Text>
      </HStack>

      <HStack mt="2" spacing={3}>
        <Text fontSize="sm" color="gray.600">
          DOB:
        </Text>
        <Text fontSize="sm">{doctorDetails.date}</Text>
      </HStack>

      <HStack mt="4" spacing={3}>
        <Text fontSize="sm" color="gray.600">
          Experience:
        </Text>
        <Text fontSize="sm">{doctorDetails.experience}</Text>
      </HStack>
    </Box>
  );
}

export default DoctorProfile;
