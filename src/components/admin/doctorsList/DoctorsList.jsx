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
  Button,
  Flex,
  Input,
  InputGroup,
  ButtonGroup,
  Text,
  TableContainer,
} from "@chakra-ui/react";
import { adminInstance } from "../../../utils/axios";
import { ALL_DOCTORS } from "../../../utils/ConstUrls";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce"; // import debounce function from lodash library

const DoctorsList = () => {
  const PAGE_SIZE = 6;
  const navigate = useNavigate();
  const [doctorsList, setDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // add state for search term


  useEffect(() => {
    getDoctorsDetails();
  }, [searchTerm, currentPage]);

  const getDoctorsDetails = async () => {
    try {
      const response = await adminInstance.get(ALL_DOCTORS);
      let filteredDoctors = response.data;
      if (searchTerm) {
        filteredDoctors = response.data.filter((doctor) =>
          doctor.fullName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      setTotalPages(Math.ceil(filteredDoctors.length / PAGE_SIZE));
      const startIndex = (currentPage - 1) * PAGE_SIZE;
      const endIndex = startIndex + PAGE_SIZE;
      const doctorsToDisplay = filteredDoctors.slice(startIndex, endIndex);
      setDoctors(doctorsToDisplay);
    } catch (err) {
      navigate('/error')
    }
  };

  const viewMore = (id) => {
    navigate(`/doctor-card/${id}`);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearch = debounce((value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, 700);

  return (
    <Box
      p={{ base: "4", md: "6" }}
      bg="white"
      mx={{ base: "2", md: "auto" }}
      mt={{ base: "12", md: "24" }}
      maxW={{ base: "none", md: "1400px" }}
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="lg"
      shadow="md"
      dark={{
        bg: "gray.800",
        border: "1px",
        borderColor: "gray.700",
      }}
    >
      <Text fontWeight="bold" fontSize={{ base: "2xl", md: "3xl" }}>
        DOCTORS LIST
      </Text>
      <Stack>
        <Box>
          {doctorsList && doctorsList.length > 0 && (
            <InputGroup size="sm">
              <Input
                className="border1"
                type="text"
                placeholder="Search by name"
                border="white"
                mt={{ base: "4", md: "10" }}
                mr={{ base: "0", md: "130" }}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </InputGroup>
          )}
          <TableContainer>
            {doctorsList && doctorsList.length > 0 ? (
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Email</Th>
                    <Th>Specialization</Th>
                    <Th>Contact</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {doctorsList.map((doctor, index) => (
                    <Tr key={index}>
                      <Td>{doctor.fullName}</Td>
                      <Td>{doctor.email}</Td>
                      <Td>{doctor.specialization}</Td>
                      <Td>{doctor.number}</Td>
                      <Td>
                        <Button
                          colorScheme="blue"
                          size="sm"
                          mr={2}
                          onClick={() => viewMore(doctor._id)}
                        >
                          view more
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            ) : (
              <Text mt={4}>No doctors found</Text>
            )}
          </TableContainer>
          {doctorsList && doctorsList.length > 6 && (
            <Flex
              className="parent-element"
              display="flex"
              justifyContent="flex-end"
              mr={{ base: "0", md: "150" }}
            >
              <ButtonGroup mt={{ base: "4", md: "10" }}>
                <Button
                  disabled={currentPage === 1}
                  onClick={() => handlePrevPage()}
                  variant="outline"
                >
                  Previous
                </Button>
                <Button
                  disabled={currentPage === totalPages}
                  onClick={() => handleNextPage()}
                  ml="-px"
                >
                  Next
                </Button>
              </ButtonGroup>
            </Flex>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default DoctorsList;
