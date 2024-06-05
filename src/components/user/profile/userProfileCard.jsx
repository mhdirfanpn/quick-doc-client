import {
  Box,
  Grid,
  GridItem,
  Text,
  IconButton,
  Avatar,
} from "@chakra-ui/react";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { MdDateRange, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useState } from "react";
import { useEffect } from "react";
import axios from "../../../utils/axios";
import { USER_DETAILS } from "../../../utils/ConstUrls";

// eslint-disable-next-line
function UserProfileCard(props) {
  const navigate = useNavigate();

  const token = localStorage.getItem("userToken");
  const decode = jwtDecode(token);
  const [UserDetails, setUserDetails] = useState("");

  useEffect(() => {
    getUserDetails();
    // eslint-disable-next-line
  }, []);

  const getUserDetails = async () => {
    await axios
      .get(`${USER_DETAILS}/${decode.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUserDetails(response.data.userDetails);
      })
      .catch((err) => {
        navigate('/error')
      });
  };

  return (
    <Box
      mx={{ base: "2", md: "auto" }}
      marginTop={24}
      minH={"88vh"}
      bg="white"
      rounded="lg"
      border="1px"
      borderColor="gray.200"
      maxW={{ base: "90vw", md: "1400px" }}
      p={{ base: "4", md: "8" }}
      shadow="md"
      dark={{ bg: "gray.800", borderColor: "gray.700" }}
      position="relative"
    >
      <IconButton
        aria-label="Edit Profile"
        icon={<MdEdit />}
        size="md"
        position="absolute"
        top="4"
        right="4"
        onClick={() => navigate("/profile/edit")}
      />
      <Grid
        gap={8}
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
        autoFlow={{ base: "dense", md: "row" }}
      >
        <GridItem>
          <Avatar
            size={{ base: "3xl", md: "2xl" }}
            src={UserDetails.profilePic}
            alt={UserDetails.userName}
            mb={5}
            rounded="full"
          />

          <Text
            fontSize={{ base: "4xl", md: "6xl" }}
            fontWeight="bold"
            color="gray.500"
            dark={{ color: "gray.400" }}
          >
            {UserDetails.userName}
          </Text>
          <Box display="flex" alignItems="center">
            <AiOutlineMail
              size={28}
              style={{ marginRight: "10px", marginTop: "60px" }}
            />
            <Text
              mb={5}
              mt={{ base: "2", md: "80px" }}
              fontSize={{ base: "xl", md: "2xl" }}
              fontWeight="bold"
              color="gray.500"
              dark={{ color: "gray.400" }}
            >
              Email - {UserDetails.email}
            </Text>
          </Box>
          <Box display="flex" alignItems="center">
            <AiOutlinePhone
              size={28}
              style={{ marginRight: "10px", marginBottom: "27px" }}
            />
            <Text
              mb={5}
              fontSize={{ base: "xl", md: "2xl" }}
              fontWeight="bold"
              color="gray.500"
              dark={{ color: "gray.400" }}
            >
              Mobile - {UserDetails.number}
            </Text>
          </Box>
          <Box display="flex" alignItems="center">
            <MdDateRange
              size={28}
              style={{ marginRight: "10px", marginBottom: "27px" }}
            />
            <Text
              mb={5}
              fontSize={{ base: "xl", md: "2xl" }}
              fontWeight="bold"
              color="gray.500"
              dark={{ color: "gray.400" }}
            >
              Date of Birth - {UserDetails.date}
            </Text>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default UserProfileCard;
