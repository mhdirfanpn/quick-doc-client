import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import {
  userDetailsUpdateSchema,
  changePasswordSchema,
} from "../../../schemas";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../../redux/spinnerSlice";
import { React, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import axios from "../../../utils/axios";
import toast, { Toaster } from "react-hot-toast";
import {
  USER_DETAILS,
  UPDATE_PROFILE,
  UPDATE_PASS,
  UPDATE_IMG,
} from "../../../utils/ConstUrls";
import { useNavigate } from "react-router-dom";

const UpdateProperty = () => {
  const [UserDetails, setUserDetails] = useState("");
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");
  const [state, setState] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure(); // state variables for showing/hiding the modal
  const token = localStorage.getItem("userToken");
  const decode = jwtDecode(token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUserDetails = async () => {
    try {
      await axios
        .get(`${USER_DETAILS}/${decode.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUserDetails(response.data.userDetails);
          dispatch(hideLoading());
        })
        .catch((err) => {
          navigate('/error')
        });
    } catch (err) {
      navigate('/error')
    }
  };

  const onSubmit = async (values, actions) => {
    dispatch(showLoading());
    await axios
      .put(`${UPDATE_PROFILE}/${decode.id}`, values, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        dispatch(hideLoading());
        if (response.data) {
          setState(response.data);
          toast.success("updated successfully");
        } else {
          toast.error("Oops Something went wrong");
        }
      })
      .catch((err) => {
        dispatch(hideLoading());
        toast.error("Oops Something went wrong");
      });
    actions.resetForm();
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        userName: UserDetails.userName,
        email: UserDetails.email,
        number: UserDetails.number,
      },
      enableReinitialize: true,
      validationSchema: userDetailsUpdateSchema,
      onSubmit,
    });

  const {
    values: form2Values,
    errors: form2Errors,
    touched: form2Touched,
    handleChange: form2HandleChange,
    handleBlur: form2HandleBlur,
    handleSubmit: form2HandleSubmit,
  } = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: changePasswordSchema,
    onSubmit: async (values, actions) => {
      dispatch(showLoading());
      await axios
        .put(`${UPDATE_PASS}/${decode.id}`, values, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          dispatch(hideLoading());
          if (response.data) {
            setState(response.data);
            toast.success("Password updated successfully");
          } else {
            toast.error("Oops Something went wrong");
          }
        })
        .catch((err) => {
          dispatch(hideLoading());
          toast.error("Oops Something went wrong");
        });
      actions.resetForm();
    },
  });

  const handleChangeImg = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleImageSumbit = async (e) => {
    e.preventDefault();
    if (profilePicture === "") {
      return toast.error("Please select an image");
    }
    const formData = new FormData();
    formData.append("image", profilePicture);
    dispatch(showLoading());
    await axios
      .put(`${UPDATE_IMG}/${decode.id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res) {
          setState(res);
          onClose();
          dispatch(hideLoading());
          toast.success("image updated successfully");
        }
      })
      .catch((err) => {
        onClose();
        dispatch(hideLoading());
        toast.error("Oops Something went wrong");
      });
  };

  useEffect(() => {
    getUserDetails();
  }, [state]);

  let imageUrl = UserDetails.profilePic;

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          User Profile Edit
        </Heading>

        <FormControl id="userName">
          <Stack direction={["column", "row"]} spacing={6}>
            <Center>
              <Avatar size="xl" src={imageUrl}>
                <AvatarBadge
                  as={IconButton}
                  size="sm"
                  rounded="full"
                  top="-10px"
                  colorScheme="green"
                />
              </Avatar>
            </Center>
            <Center w="full">
              <Button onClick={onOpen}>Upload Profile Image</Button>
              <Modal
                isOpen={isOpen}
                onClose={onClose}
                motionPreset="scale"
                isCentered={false}
                top="auto"
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Upload Profile Image</ModalHeader>
                  <ModalCloseButton />
                  <form onSubmit={handleImageSumbit}>
                    <ModalBody>
                      <FormControl id="profileImage">
                        <FormLabel>Choose an image to upload</FormLabel>
                        <input
                          accept="image/*"
                          type="file"
                          name="file"
                          onChange={handleChangeImg}
                        />
                      </FormControl>
                    </ModalBody>
                    <ModalFooter>
                      <Button onClick={onClose} mr={3}>
                        Cancel
                      </Button>
                      <Button colorScheme="blue" type="submit">
                        Upload
                      </Button>
                    </ModalFooter>
                  </form>
                </ModalContent>
              </Modal>
            </Center>
          </Stack>
        </FormControl>
        <form onSubmit={handleSubmit}>
          <FormControl id="userName" isRequired>
            <FormLabel>User name</FormLabel>
            <Input
              name="userName"
              id="userName"
              value={values.userName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your name"
              _placeholder={{ color: "gray.500" }}
              type="text"
              style={{ color: "grey" }}
            />
            {errors.userName && touched.userName && (
              <p className="error">{errors.userName}</p>
            )}
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              name="email"
              id="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your email"
              style={{ color: "grey" }}
            />
            {errors.email && touched.email && (
              <p className="error">{errors.email}</p>
            )}
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Contact</FormLabel>
            <Input
              value={values.number}
              onChange={handleChange}
              onBlur={handleBlur}
              id="number"
              name="number"
              type="number"
              placeholder="Enter your number"
              style={{ color: "grey" }}
            />
            {errors.number && touched.number && (
              <p className="error">{errors.number}</p>
            )}
          </FormControl>
          <Stack spacing={6} direction={["column", "row"]}>
            <Button
              colorScheme="blue"
              bg="#4851b0"
              size="md"
              mt={6}
              width="100%"
              alignContent="center"
              type="submit"
              color="white"
            >
              SAVE CHANGES
            </Button>
          </Stack>
          <Flex justifyContent="center" mt={4}>
            <Button
              variant="link"
              fontSize="sm"
              fontWeight="medium"
              color="red.500"
              _hover={{ textDecoration: "underline" }}
              onClick={() => setShowPasswordForm(!Boolean(showPasswordForm))}
            >
              Change Password
            </Button>
          </Flex>
        </form>

        {showPasswordForm && (
          <form onSubmit={form2HandleSubmit}>
            <FormControl mt={5}>
              <FormLabel>New Password</FormLabel>
              <Input
                value={form2Values.newPassword}
                onChange={form2HandleChange}
                onBlur={form2HandleBlur}
                id="newPassword"
                name="newPassword"
                type="password"
                placeholder="Enter your new password"
                bg="white"
                border="1px"
                borderColor="purple.400"
                borderRadius="md"
                focusBorderColor="purple.400"
                focusRingColor="purple.300"
                _focus={{ boxShadow: "none" }}
                style={{ color: "grey" }}
              />
              {form2Errors.newPassword && form2Touched.newPassword && (
                <p className="error">{form2Errors.newPassword}</p>
              )}
            </FormControl>

            <FormControl mt={5}>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                value={form2Values.confirmPassword}
                onChange={form2HandleChange}
                onBlur={form2HandleBlur}
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Enter your confirm password"
                bg="white"
                border="1px"
                borderColor="purple.400"
                borderRadius="md"
                focusBorderColor="purple.400"
                focusRingColor="purple.300"
                _focus={{ boxShadow: "none" }}
                style={{ color: "grey" }}
              />
              {form2Errors.confirmPassword && form2Touched.confirmPassword && (
                <p className="error">{form2Errors.confirmPassword}</p>
              )}
            </FormControl>

            <Flex justifyContent="center" mt={4}>
              <Button
                type="submit"
                w="48"
                px="4"
                py="2"
                fontSize="md"
                fontWeight="medium"
                textTransform="uppercase"
                colorScheme="blue"
                bg="#4851b0"
              >
                Save Password
              </Button>
            </Flex>
          </form>
        )}
      </Stack>
      <Toaster />
    </Flex>
  );
};

export default UpdateProperty;
