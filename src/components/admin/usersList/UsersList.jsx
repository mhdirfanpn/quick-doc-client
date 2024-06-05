
/* eslint-disable */ 
import { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Switch,
  Stack,
  Box,
  InputGroup,
  ButtonGroup,
  Input,
  Flex,
  Text,
  TableContainer,
} from "@chakra-ui/react";
import { ALL_USERS, BLOCK_USER, UNBLOCK_USER } from "../../../utils/ConstUrls";
import { adminInstance } from "../../../utils/axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import debounce from "lodash.debounce"; // import debounce function from lodash library

const UsersList = () => {
  const PAGE_SIZE = 6;
  const [state, setState] = useState("");
  const [usersList, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate()
  const d = new Date();
  let time = d.getTime();

  const unBlock = async (id) => {
    try {
      await adminInstance
      .put(`${UNBLOCK_USER}/${id}`)
        setState(time);
        toast.success("unblocked");
    } catch (error) {   
      navigate('/error') 
    }
   
  };

  const block = async (id) => {
    try {
      await adminInstance
      .put(`${BLOCK_USER}/${id}`)
      setState(time);
      toast.error("blocked");
    } catch (error) {
      navigate('/error')
    }
  };

  useEffect(() => {
    getUserDetails();
  }, [state, searchTerm, currentPage]);

  const getUserDetails = async () => {
    try {
      const response = await adminInstance.get(ALL_USERS);
      let filteredUsers = response.data;
      if (searchTerm) {
        filteredUsers = response.data.filter((user) =>
          user.userName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      setTotalPages(Math.ceil(filteredUsers.length / PAGE_SIZE));
      const startIndex = (currentPage - 1) * PAGE_SIZE;
      const endIndex = startIndex + PAGE_SIZE;
      const usersToDisplay = filteredUsers.slice(startIndex, endIndex);
      setUsers(usersToDisplay);
    } catch (err) {
      navigate('/error')
    }
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
    maxWidth={{ base: "100%", md: "1200px", lg: "1400px" }}
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
    <Text fontWeight="bold" fontSize={{ base: "2xl", md: "3xl" }}>
      USERS LIST
    </Text>
    <Stack>
      <Box>
        <InputGroup size={{ base: "sm", md: "md" }}>
          <Input
            className="border1"
            type="text"
            placeholder="Search by name"
            border="white"
            mt={{ base: "4", md: "10" }}
            mr={{ base: "4", md: "10" }}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </InputGroup>
        <TableContainer>
        {usersList && usersList.length > 0 ? (
          <Table variant="simple">
       
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Contact</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {usersList.map((user, index) => (
                <Tr key={index}>
                  <Td>{user.userName}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.number}</Td>
                  <Td>
                    {user.isBlocked ? (
                      <span style={{ color: "red" }}>blocked</span>
                    ) : (
                      <span style={{ color: "green" }}>active</span>
                    )}
                  </Td>
  
                  <Td>
                    <Switch
                      colorScheme={user.isBlocked ? "red" : "green"}
                      isChecked={user.isBlocked}
                      onChange={() => {
                        user.isBlocked ? unBlock(user._id) : block(user._id);
                      }}
                      size={{ base: "sm", md: "md" }}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
            ) : (
              <Text mt={4}>No users found</Text>
            )}
        </TableContainer>
        {usersList && usersList.length > 6 && (
        <Flex
          className="parent-element"
          display="flex"
          justifyContent="flex-end"
          mr={{ base: "4", md: "10" }}
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
    <Toaster />
  </Box>
  
  );
};

export default UsersList;
