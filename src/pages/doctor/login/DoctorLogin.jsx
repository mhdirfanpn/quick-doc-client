import { useNavigate, Link } from "react-router-dom";
import { loginSchema } from "../../../schemas";
import { useFormik } from "formik";
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
import toast, { Toaster } from "react-hot-toast";
import { doctorInstance } from "../../../utils/axios";
import { DOC_LOGIN } from "../../../utils/ConstUrls";


const DoctorLogin = () => {
  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {

      await doctorInstance
        .post(DOC_LOGIN, values)
        .then(({ data }) => {
          console.log("data", data);
          if (data.success) {
            document.cookie = `token:${data.token}`
            navigate("/doctor-home");
            localStorage.setItem("doctorToken", data.token);
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
            "https://img.freepik.com/free-photo/front-view-young-female-doctor-white-medical-suit-with-stethoscope-wearing-white-protective-mask-white_140725-16566.jpg?w=1380&t=st=1681900985~exp=1681901585~hmac=99f7f6866c534d48d0a1afe255a5bfa2b1c4401579eb02e15335097575df62c0"
          }
        />
      </Flex>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Login in to your account</Heading>
          <form onSubmit={handleSubmit}>
            <FormControl>
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

            <FormControl mt={6}>
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
                  Doesn't have an account?{" "}
                  <Link to="/doctor-register">Sign in</Link>
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
            </Stack>
          </form>
        </Stack>
      </Flex>
      <Toaster />
    </Stack>
  );
};

export default DoctorLogin;
