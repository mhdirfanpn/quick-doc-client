import { useState } from "react";
import {
  Box,
  VStack,
  Text,
  Checkbox,
  Badge,
  Button,
  Flex,
} from "@chakra-ui/react";
import jwtDecode from "jwt-decode";
import { doctorInstance } from "../../../utils/axios";
import { DOC_TIMINGS } from "../../../utils/ConstUrls";
import toast, { Toaster } from "react-hot-toast";
import { DatePicker } from "antd";
import { useNavigate } from "react-router-dom";


const availableTimings = [
  { time: "10:00 AM" },
  { time: "12:00 PM" },
  { time: "2:00 PM" },
  { time: "4:00 PM" },
  { time: "6:00 PM" },
  { time: "8:00 PM" },
];

function TimeSlot() {
  const [selectedTimings, setSelectedTimings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate()

  const handleTimingSelection = (timing) => {
    const index = selectedTimings.indexOf(timing);
    if (index === -1) {
      setSelectedTimings([...selectedTimings, timing]);
    } else {
      setSelectedTimings(selectedTimings.filter((t) => t !== timing));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedDate === null) return toast.error("select a date");
    try {
      const decode = jwtDecode(localStorage.getItem("doctorToken"));
      let id = decode.id;

      const body = {
        selectedDate,
        selectedTimings,
        id,
      };
      await doctorInstance.post(DOC_TIMINGS, body);
      toast.success("time slot updated successfully");
    } catch (err) {
      navigate('/error')
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date.toISOString().split("T")[0]);
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
    <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="medium">
      Select Date:
    </Text>
    <Box mt={3}>
      <DatePicker onChange={handleDateChange} />
    </Box>
    <VStack align="stretch" spacing={4} mt={9}>
      <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="medium">
        Select Time:
      </Text>
      <Flex wrap="wrap">
        {availableTimings.map((timing) => (
          <Checkbox
            paddingLeft={{ base: 2, md: 28 }}
            key={timing.time}
            // isDisabled={!timing.available}
            isChecked={selectedTimings.includes(timing)}
            onChange={() => handleTimingSelection(timing)}
          >
            {timing.time}
            {/* {!timing.available && (
              <Badge ml={2} colorScheme="red">
                Booked
              </Badge>
            )} */}
          </Checkbox>
        ))}
      </Flex>
      <Flex justify="center">
        <Button
          mt={6}
          colorScheme="blue"
          size={{ base: "sm", md: "md" }}
          disabled={selectedTimings.length === 0}
          onClick={handleSubmit}
        >
          Submit Timings
        </Button>
      </Flex>
      <Flex mt={4}>
        {selectedTimings.length > 0 ? (
          selectedTimings.map((timing) => (
            <Box key={timing.time} mr={{ base: 2, md: 12 }}>
              <Badge colorScheme="green">{timing.time}</Badge>
            </Box>
          ))
        ) : (
          <Text fontStyle="italic">
            Please select one or more available appointment timings.
          </Text>
        )}
      </Flex>
    </VStack>
    <Toaster />
  </Box>
  
  );
}

export default TimeSlot;
