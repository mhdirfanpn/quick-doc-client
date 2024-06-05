/* eslint-disable */ 
import {
  Box,
  Grid,
  GridItem,
  Text,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { adminInstance } from "../../../utils/axios";
import { VERIFY_DOC, REJECT_DOC, GET_DOC } from "../../../utils/ConstUrls";

const DoctorCard = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [doctorList, setDoctor] = useState([]);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const cancelRef = useRef();

  useEffect(() => {
    getDoctorsDetails();
  }, []);

  const handleApproveClick = () => {
    setIsConfirming(true);
    setIsApproving(true);
  };

  const handleRejectClick = () => {
    setIsConfirming(true);
    setIsRejecting(true);
  };

  const handleCancel = () => {
    setIsConfirming(false);
    setIsApproving(false);
    setIsRejecting(false);
  };

  const handleConfirm = () => {
    if (isApproving) {
      approve(doctorList._id);
    } else if (isRejecting) {
      reject(doctorList._id);
    }

    setIsConfirming(false);
    setIsApproving(false);
    setIsRejecting(false);
  };

  const approve = (id) => {
    adminInstance.put(`${VERIFY_DOC}/${id}`).then(() => {
      navigate("/manage-doctors");
    });
  };

  const reject = (id) => {
    adminInstance.put(`${REJECT_DOC}/${id}`).then(() => {
      navigate("/manage-doctors");
    });
  };

  const getDoctorsDetails = async () => {
    adminInstance.get(`${GET_DOC}/${params.doctorId}`)
      .then((response) => {
        setDoctor(response.data.doctor);
      })
      .catch((err) => {
        navigate('/error')
      });
  };

  return (
    <Box
      p={["2", "4", "6"]}
      bg="white"
      marginLeft={["2", "4", "24"]}
      marginTop={["2", "4", "24"]}
      maxWidth={["100%", "100%", "1400px"]}
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
      <Grid
        gap={8}
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
      >
        <GridItem>
          <Text
            mb={5}
            fontSize="light"
            color="gray.500"
            dark={{ color: "gray.400" }}
          >
            Name - DR. {doctorList.fullName}
          </Text>
          <Text
            mb={5}
            fontSize="light"
            color="gray.500"
            dark={{ color: "gray.400" }}
          >
            Email - {doctorList.email}
          </Text>
          <Text
            mb={5}
            fontSize="light"
            color="gray.500"
            dark={{ color: "gray.400" }}
          >
            Mobile - {doctorList.number}
          </Text>
          <Box
            d="flex"
            justifyContent={{ base: "center", md: "start" }}
            mt={{ md: 5 }}
          >
            {doctorList.isVerified ? (
              <Text textShadow={4} style={{ color: "green" }} p={4}>
                Approved
              </Text>
            ) : (
              <Box mt={{ base: 5, md: 0 }}>
                <Button
                  colorScheme="blue"
                  size="sm"
                  mr={5}
                  onClick={handleApproveClick}
                >
                  Approve
                </Button>
                <Button
                  colorScheme="gray"
                  size="sm"
                  onClick={handleRejectClick}
                >
                  Reject
                </Button>
                <AlertDialog
                  isOpen={isConfirming}
                  leastDestructiveRef={cancelRef}
                  onClose={handleCancel}
                >
                  <AlertDialogOverlay>
                    <AlertDialogContent>
                      <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Confirm Action
                      </AlertDialogHeader>
                      <AlertDialogBody>
                        {isApproving
                          ? `Are you sure you want to approve ${doctorList.fullName}'s request?`
                          : `Are you sure you want to reject ${doctorList.fullName}'s request?`}
                      </AlertDialogBody>
                      <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={handleCancel}>
                          Cancel
                        </Button>
                        <Button
                          colorScheme={isApproving ? "blue" : "red"}
                          onClick={handleConfirm}
                          ml={3}
                        >
                          {isApproving ? "Approve" : "Reject"}
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialogOverlay>
                </AlertDialog>
              </Box>
            )}
          </Box>
        </GridItem>
        <GridItem>
          <Text
            mb={5}
            fontSize="light"
            color="gray.500"
            dark={{ color: "gray.400" }}
          >
            Specialization - {doctorList.specialization}
          </Text>
          <Text
            mb={5}
            fontSize="light"
            color="gray.500"
            dark={{ color: "gray.400" }}
          >
            Experience - {doctorList.experience}
          </Text>
          <Text
            mb={5}
            fontSize="light"
            color="gray.500"
            dark={{ color: "gray.400" }}
          >
            Medical Registration Number - {doctorList.register}
          </Text>
          <Text
            mb={5}
            fontSize="light"
            color="gray.500"
            dark={{ color: "gray.400" }}
          >
            Date of Birth - {doctorList.date}
          </Text>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default DoctorCard;
