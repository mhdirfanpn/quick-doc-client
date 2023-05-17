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
  Text,
  TableContainer,
} from "@chakra-ui/react";
import { adminInstance } from "../../../utils/axios";
import { APPOINTMENT } from "../../../utils/ConstUrls";
import { useNavigate } from "react-router-dom";

const AppointmentList = () => {
  const navigate = useNavigate()
  const [appointment, setAppointment] = useState([""]);

  useEffect(() => {
    getAppointment();
  }, []);

  const getAppointment = async () => {
    try {
      const response = await adminInstance.get(APPOINTMENT);
      setAppointment(response.data.appointments);
    } catch (err) {
      navigate('/error')
    }
  };


  return (
    <Box 
    p={{ base: "4", md: "6" }}
    bg="white"
    mx={{ base: "2", md: "auto" }}
    mt={{ base: "12", md: "24" }}
    maxW={{ base: "none", md: "1400px" }}
  border="1px"
  borderColor="gray.200"
  rounded="lg"
  shadow="md"
  dark={{
    bg: "gray.800",
    border: "1px",
    borderColor: "gray.700",
  }}
>
  <Text fontWeight="bold" fontSize={{base: "2xl", md: "3xl"}}>
    APPOINTMENTS
  </Text>
  <Stack>
  <Box>
  {appointment && appointment.length > 0 ? (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Doctor Name</Th>
            <Th>Patient Name</Th>
            <Th>Booked Date</Th>
            <Th>Session Date</Th>
            <Th>Time Slot</Th>
          </Tr>
        </Thead>
        <Tbody>
          {appointment.map((appointment, index) => (
            <Tr key={index}>
              <Td>Dr. {appointment.doctorName}</Td>
              <Td>{appointment.userName}</Td>
              <Td>{appointment.bookedDate}</Td>
              <Td>{appointment.sessionDate}</Td>
              <Td>{appointment.timeSlot}</Td>
              <Td></Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  ) : (
    <Text mt={4}>No appointments found</Text>
  )}
</Box>

  </Stack>
</Box>


  );
};

export default AppointmentList;
