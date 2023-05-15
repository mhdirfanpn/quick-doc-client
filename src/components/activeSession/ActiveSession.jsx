import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Heading, Stack, Flex, Avatar, Badge } from "@chakra-ui/react";
import axios from "../../utils/axios";
import { USER_CHAT, DOC_CHAT } from "../../utils/ConstUrls";
import { MdVideoCall } from "react-icons/md";
import { doctorInstance } from "../../utils/axios";
import jwtDecode from "jwt-decode";
import { useSelector } from "react-redux";

const ActiveSession = ({ handleActiveSessionId, currentUser, isDoctor }) => {
  const [activeSession, setActiveSession] = useState("");
  const navigate = useNavigate();
  const doctorToken = useSelector((state) => state.doctor.doctorToken);
  const userToken = useSelector((state) => state.user.userToken);
  let commonUser;
  if (doctorToken) {
    commonUser = jwtDecode(doctorToken);
  } else {
    commonUser = jwtDecode(userToken);
  }
  const handleJoinRoom = useCallback(() => {
    let result = "";
    if (result) return result;
    var chars =
        "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
      maxPos = chars.length,
      i;
    for (i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    console.log(result);
    let link = {};
    link.data = result;
    const body = link;

    try {
      axios.put(`doc/link/${commonUser.id}`, body).then((res) => {});
    } catch (error) {
      console.log(error);
    }

    window.open(`/room/${result}`);
  }, []);

  useEffect(() => {
    const getSession = async () => {
      try {
        if (isDoctor) {
          const res = await doctorInstance.get(`getActiveSession/${currentUser}`);
          setActiveSession(res.data);
          handleActiveSessionId(res.data.userId);
        } else {
          const res = await axios.get(`getActiveSession/${currentUser}`, {
            headers: { Authorization: `Bearer ${userToken}` },
          });
          setActiveSession(res.data);
          handleActiveSessionId(res.data?.doctorId);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getSession();
  }, []);

  const handleJoinUser = async () => {
    try {
      console.log("here");
      await axios.get(`getActiveSession/${currentUser}`,{
        headers: { Authorization: `Bearer ${userToken}` },
      }).then((res) => {
        let link = res.data.link;
        if (link !== null) {
          window.open(`/room/${link}`);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(()=>{
  //   getuserData = async()=>{
  //     if(isDoctor){
  //       //find userData for avatar
  //     }else{
  //       //find doctor for avatar
  //     }
  //   }
  //   getuserData()
  // },[])

  return (
    activeSession?._id && (
      <Box mt={4} backgroundColor="gray.100" h={20}>
        <Stack spacing="4">
          <Flex alignItems="center" mt={4} ml={2}>
            <Avatar
              size="md"
              y
              name="John Doe"
              src={`https://bit.ly/dan-abramov`}
            />
            <Box ml="4">
              <Heading as="h2" fontSize="lg">
                {isDoctor ? activeSession?.userName : activeSession?.doctorName}
              </Heading>
              <Badge variant="subtle" colorScheme="green" ml="2">
                Online
              </Badge>
            </Box>
            <Box ml={9}>
              <MdVideoCall
                size={"50px"}
                onClick={isDoctor ? handleJoinRoom : handleJoinUser}
              />
            </Box>
          </Flex>
        </Stack>
      </Box>
    )
  );
};

export default ActiveSession;
