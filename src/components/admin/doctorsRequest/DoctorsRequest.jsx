/* eslint-disable */ 
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
import { useState, useEffect } from "react";
import { adminInstance } from "../../../utils/axios";
import { ALL_DOC_REQ } from "../../../utils/ConstUrls";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";

const DoctorsRequest = () => {
  const PAGE_SIZE = 6;
  const navigate = useNavigate();
  const [doctorsReq, setDocReq] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getDoctorsReq();
  }, [currentPage, searchTerm]);

  const getDoctorsReq = async () => {
    try {
      const response = await adminInstance.get(ALL_DOC_REQ);
      const filteredDoctors = response.data.filter((doctor) =>
        doctor.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setTotalPages(Math.ceil(filteredDoctors.length / PAGE_SIZE));
      const startIndex = (currentPage - 1) * PAGE_SIZE;
      const endIndex = startIndex + PAGE_SIZE;
      const usersToDisplay = filteredDoctors.slice(startIndex, endIndex);
      setDocReq(usersToDisplay);
    } catch (err) {
      navigate('/error')
    }
  };

  const viewMore = (id) => {
    navigate(`/doctor-card/${id}`);
  };

  const handleSearch = debounce((value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, 700);

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

  return (
    <Box
      p={{ base: "2", md: "6" }}
      bg="white"
      ml={{ base: "2", md: "24" }}
      mt={{ base: "2", md: "24" }}
      maxW={{ base: "100%", md: "1400" }}
      borderWidth="1px"
      borderColor="gray.200"
      rounded="lg"
      shadow="md"
      dark={{
        bg: "gray.800",
        border: "1px",
        borderColor: "gray.700",
      }}
    >
      <Text fontWeight="bold" fontSize={{ base: "xl", md: "3xl" }}>
        DOCTORS REQUEST
      </Text>
      <Stack>
        <Box>
          {doctorsReq && doctorsReq.length > 0 && (
            <InputGroup size="sm">
              <Input
                className="border1"
                type="text"
                placeholder="Search by name"
                border="white"
                mt={{ base: "4", md: "10" }}
                mr={{ base: "2", md: "130" }}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </InputGroup>
          )}
          <TableContainer>
            {doctorsReq && doctorsReq.length > 0 ? (
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
                  {doctorsReq.map((doctor, index) => (
                    <Tr key={index}>
                      <Td>{doctor.fullName}</Td>
                      <Td>{doctor.email}</Td>
                      <Td>{doctor.specialization}</Td>
                      <Td>{doctor.number}</Td>
                      <Td>
                        <Button
                          colorScheme="blue"
                          size={{ base: "xs", md: "sm" }}
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
              <Text mt={4}>No requests found</Text>
            )}
          </TableContainer>
          {doctorsReq && doctorsReq.length > 6 && (
            <Flex
              className="parent-element"
              display="flex"
              justifyContent="flex-end"
              mr={{ base: "2", md: "150" }}
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
                  ml={{ base: "-1", md: "-px" }}
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

export default DoctorsRequest;
