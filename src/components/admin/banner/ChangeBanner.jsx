import {
  Box,
  Button,
  Text,
  FormControl,
  FormLabel,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { React, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../../redux/spinnerSlice";
import {
  UPDATE_BANNER,
  GET_USER_BANNER,
  UPDATE_BANNER_DISC,
} from "../../../utils/ConstUrls";
import { adminInstance } from "../../../utils/axios";

const ChangeBanner = () => {
  const [bannerImage, setBannerImage] = useState("");
  const [banner, setBanner] = useState("");
  const [discription, setDiscription] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure(); // state variables for showing/hiding the modal
  const dispatch = useDispatch();

  const handleChangeImg = (e) => {
    setBannerImage(e.target.files[0]);
  };

  const handleImageSumbit = async (e) => {
    try {
      e.preventDefault();
      if (bannerImage === "") {
        return toast.error("Please select an image");
      }
      const formData = new FormData();
      formData.append("image", bannerImage);
      dispatch(showLoading());
      const res = await adminInstance.put(UPDATE_BANNER, formData);
      if (res) {
        setBanner(res.data.updatedBanner);
        onClose();
        dispatch(hideLoading());
      }
    } catch (error) {
      onClose();
      dispatch(hideLoading());
      toast.error("Oops Something went wrong");
    }
  };

  useEffect(() => {
    const getBanner = async () => {
      try {
        const response = await adminInstance.get(GET_USER_BANNER);
        setBanner(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getBanner();
  }, [banner?.bannerPic]);

  const BannerDiscription = async (e) => {
    e.preventDefault();

    const NewDiscription = {
      text: discription,
    };

    try {
      await adminInstance.post(UPDATE_BANNER_DISC, NewDiscription);
      toast.success("discription updated successfully");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box
      mx={["auto", "auto", "24"]}
      mt={["6", "6", "24"]}
      p={["4", "6"]}
      bg="white"
      maxW="1400px"
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
      {banner?.bannerPic ? (
    <Box
      bgImage={`url(${banner?.bannerPic})`}
      bgSize="cover"
      bgPosition="center"
      h={["300px", "400px", "600px"]}
      w="100%"
    >
    </Box>
  ) : ( 
      <Text
        color="gray.500"
        fontSize={["2xl", "3xl", "4xl"]}
        fontWeight="bold"
        textAlign="center"
        mt="48"
      >
        Upload banner
      </Text>
  )}


      <Button mt={4} onClick={onOpen} colorScheme="blue">
        Change Banner Image
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="scale"
        isCentered={false}
        top="auto"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload banner Image</ModalHeader>
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
      <Box mt={["6", "6", "9"]}>
        <Textarea
          placeholder={banner?.description}
          mb="4"
          borderWidth="5px"
          onChange={(e) => setDiscription(e.target.value)}
        />
        <Button colorScheme="blue" onClick={BannerDiscription}>
          Change banner discription
        </Button>
      </Box>

      <Toaster />
    </Box>
  );
};

export default ChangeBanner;
