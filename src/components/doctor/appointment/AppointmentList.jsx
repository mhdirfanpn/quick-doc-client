import { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Stack,
  Flex,
  Text,
  TableContainer,
} from "@chakra-ui/react";
import { doctorInstance } from "../../../utils/axios";
import { DOC_APPOINTMENT } from "../../../utils/ConstUrls";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AppointmentList = () => {
  const token = localStorage.getItem("doctorToken");
  const DoctorData = jwtDecode(token);
  const [session, setSession] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    getSessionDetails();
  }, []);

  const getSessionDetails = async () => {
    try {
      const response = await doctorInstance.get(`${DOC_APPOINTMENT}/${DoctorData.id}`);
      setSession(response.data.session);
    } catch (err) {
      navigate('/error')
    }
  };

  return (
    <Box 
  p={{ base: "4", md: "6" }}
  bg="white"
  ml={{ base: "0", md: "24" }}
  mt={{ base: "0", md: "24" }}
  maxW="1400px"
  borderWidth="1px"
  borderColor="gray.200"
  rounded="lg"
  shadow="md"
  _hover={{ bg: "gray.100" }}
  dark={{
    bg: "gray.800",
    borderWidth: "1px",
    borderColor: "gray.700",
    _hover: { bg: "gray.700" },
  }}
>
  <Text fontWeight="bold" fontSize={{ base: "xl", md: "3xl" }}>
    APPOINTMENTS
  </Text>
  <Stack>
    <Box>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Patient Name</Th>
              <Th>Booked Date</Th>
              <Th>Appointment Date</Th>
              <Th>Time Slot</Th>
            </Tr>
          </Thead>
          <Tbody>
            {session?.map((appointment, index) => (
              <Tr key={index}>
                <Td>{appointment.userName}</Td>
                <Td>{appointment.bookedDate}</Td>
                <Td>{appointment.sessionDate}</Td>
                <Td>{appointment.timeSlot}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Flex
        className="parent-element"
        display="flex"
        justifyContent="flex-end"
        mr={{ base: "4", md: "150" }}
      ></Flex>
    </Box>
  </Stack>
</Box>

  );
};

export default AppointmentList;
