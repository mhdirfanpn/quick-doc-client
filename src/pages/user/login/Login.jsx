import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  Stack,
  Image,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSchema } from "../../../schemas";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import axios from "../../../utils/axios";
import { USER_LOGIN } from "../../../utils/ConstUrls";
import { setLogin } from "../../../redux/userSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (values, actions) => {
    const body = JSON.stringify(values);
      await axios
        .post(USER_LOGIN, body, {
          headers: { "Content-Type": "application/json" },
        })
        .then(({ data }) => {
          console.log(data);
          if (data.success) {
            document.cookie = `token:${data.token}`;
       
            navigate("/home");
            localStorage.setItem("userToken", data.token);
          } else {
            toast.error(data.message);
          }
        })
        .catch((err) => {
          toast.error("Oops Something went wrong");
        });
    actions.resetForm();
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit,
    });

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
          <Heading fontSize={"2xl"}>Login in to your account</Heading>
          <form onSubmit={handleSubmit}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                id="email"
                type="email"
                placeholder="Enter your email"
              />
              {errors.email && touched.email && (
                <p className="error">{errors.email}</p>
              )}
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                id="password"
                type="password"
                placeholder="Enter your password"
              />
              {errors.password && touched.password && (
                <p className="error">{errors.password}</p>
              )}
            </FormControl>
            <Stack spacing={6} mt={2}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Text color={"blue.500"}>
                  Doesn't have an account? <Link to="/SignUp">Sign in</Link>
                </Text>
              </Stack>
              <Button
                colorScheme={"blue"}
                variant={"solid"}
                type="submit"
                bg={"blue.500"}
              >
                LOGIN
              </Button>
              <Button
                colorScheme={"blue"}
                variant={"solid"}
                type="submit"
                onClick={() => navigate("/otp")}
                bg={"blue.500"}
              >
                OTP LOGIN
              </Button>
            </Stack>
          </form>
        </Stack>
      </Flex>
      <Toaster />
    </Stack>
  );
}
