import React from "react";
import { useRef, useState, useEffect } from "react";
import {
  Flex,
  IconButton,
  Card,
  Container,
  CardBody,
  Heading,
  Stack,
  Box,
  Text,
  Image,
  Avatar,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { GET_DOCTORS } from "../../../utils/ConstUrls";
import axios from "../../../utils/axios";
import { useNavigate } from "react-router-dom";

const DoctorCards = () => {
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef(null);
  const cardWidth = 350; // Adjust this value to change the card width
  const [doctorDetails, setDoctorDetails] = useState([""]);
  const navigate = useNavigate();

  const handleScrollLeft = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollBy({
        left: -container.offsetWidth,
        behavior: "smooth",
      });
      setScrollLeft(container.scrollLeft - container.offsetWidth);
    }
  };

  const handleScrollRight = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollBy({
        left: container.offsetWidth,
        behavior: "smooth",
      });
      setScrollLeft(container.scrollLeft + container.offsetWidth);
    }
  };

  const viewMore = (id) => {
    navigate(`/doctorDetails/${id}`);
  };

  useEffect(() => {
    getAllDoctors();
    // eslint-disable-next-line
  }, []);

  const token = localStorage.getItem("userToken");

  const getAllDoctors = async () => {
    await axios
      .get(`${GET_DOCTORS}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data.doctors) {
          setDoctorDetails(response.data.doctors);
        }
      })
      .catch((err) => {
        navigate('/error')
      });
  };

  return (
    <Container maxW={"8xl"} py={12} mt={6}>
      <Box w="100%" overflowX="hidden">
        <Heading as="h2" textAlign="center" my={8} size="2xl">
          Our Doctors
        </Heading>
        <Flex ref={containerRef} overflowX="hidden" w="100%" h="auto">
          {doctorDetails?.map((doctor) => (
            <Box minW={`${cardWidth}px`}>
              <Card maxW="sm" className="card-footer">
                <CardBody>
                  {doctor.profilePic ? (
                    <Image
                      ml={6}
                      src={doctor.profilePic}
                      alt="Green double couch with wooden legs"
                      borderRadius="lg"
                      onClick={() => viewMore(doctor._id)}
                    />
                  ) : (
                    <Avatar
                      size="lg"
                      name={doctor.fullName}
                      src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                      ml={6}
                      onClick={() => viewMore(doctor._id)}
                    />
                  )}
                  <Stack mt="6" spacing="3" ml="6">
                    <Heading size="md">{doctor.fullName}</Heading>
                    <Text>{doctor.specialization}</Text>
                  </Stack>
                </CardBody>
              </Card>
            </Box>
          ))}
        </Flex>

        <IconButton
          aria-label="Scroll left"
          icon={<ChevronLeftIcon />}
          size="md"
          variant="ghost"
          colorScheme="blue"
          position="absolute"
          left="9%"
          top="70%"
          backgroundColor="#cfceca"
          transform="translateY(-50%)"
          onClick={handleScrollLeft}
          disabled={scrollLeft === 0}
        />

        <IconButton
          aria-label="Scroll right"
          icon={<ChevronRightIcon />}
          size="md"
          variant="ghost"
          colorScheme="blue"
          position="absolute"
          right="9%"
          top="70%"
          backgroundColor="#cfceca"
          transform="translateY(-50%)"
          onClick={handleScrollRight}
          disabled={
            scrollLeft ===
            containerRef.current?.scrollWidth -
              containerRef.current?.offsetWidth
          }
        />
      </Box>
    </Container>
  );
};

export default DoctorCards;
