import React, { useEffect, useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { Button, Flex, FormControl, FormLabel, Heading, Text, Stack, Image, Input } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { authentication } from "../../../firebase";
import { OTP_LOGIN } from "../../../utils/ConstUrls";
import jwtDecode from "jwt-decode";
import axios from "../../../utils/axios";
import { setLogin } from "../../../redux/userSlice";
import { useDispatch, } from "react-redux";


const Mobile = () => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [flag, setFlag] = useState(false);
  const [username,setUsername] = useState();
  const [tokenVal,setTokenVal] = useState();
  const navigate = useNavigate()
  const dispatch = useDispatch();


  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
        },
        defaultCountry: "IN",
      },
      authentication
    );
  };

  const requestOTP = async () => {
    const phoneNumber = "+91" + mobile;
    await axios.get(`${OTP_LOGIN}/${mobile}`, { headers: { "Content-Type": "application/json" } })
    .then((res)=>{
        if(res.status===202){
          setFlag(true);
           const decode = jwtDecode(res.data.token);
           setUsername(decode.name);
           setTokenVal(res.data.token);
        }else{
            alert('mobile not registered');
            navigate('/')
        }
    })

    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        console.log(`error=> ${error.message}`);
      });
  };

  const verifyOTP = (otp) => {
    let confirmationResult = window.confirmationResult;
    confirmationResult
      .confirm(otp)
      .then(() => {
        navigate('/home')
        localStorage.setItem('userToken',tokenVal);
      })
      .catch((error) => {
        console.log(`error=> ${error.message}`);
      });
  };

  const getOTP = () => {
    requestOTP(mobile);
  };

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://img.freepik.com/free-vector/online-doctor-concept-illustration_114360-1831.jpg?size=626&ext=jpg&ga=GA1.1.1128364979.1680491256&semt=ais"
          }
        />
      </Flex>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <FormControl
            id="mobile"
            style={{ display: !flag ? "block" : "none" }}
          >
            <FormLabel>Phone Number</FormLabel>
            <Heading fontSize={"2xl"}>Login with OTP</Heading>
            <Input
              type="moble"
              id="sign-in-button"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </FormControl>
          <Stack spacing={6} style={{ display: !flag ? "block" : "none" }}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              mt={2}
              justify={"space-between"}
            >
              <Text color={"blue.500"}>
                <Link to="/">Login with password?</Link>
              </Text>
            </Stack>
            <Button
              width="full"
              style={{ display: !flag ? "block" : "none" }}
              onClick={getOTP}
              size="lg"
            >
              Send OTP
            </Button>
          </Stack>
          <FormControl id="otp" style={{ display: flag ? "block" : "none" }}>
            <Heading fontSize={"2xl"}>Verify OTP</Heading>

            <FormLabel>OTP</FormLabel>

            <Input
              type="otp"
              id="sign-in-button"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </FormControl>
          <Stack spacing={6}>
            <Button
              width="full"
              v
              onClick={() => verifyOTP(otp)}
              style={{ display: flag ? "block" : "none" }}
              size="lg"
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default Mobile;
