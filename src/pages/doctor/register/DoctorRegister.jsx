import { React } from "react";
import { useNavigate, Link } from "react-router-dom";
import { doctorSignUpSchema } from "../../../schemas";
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
  Select,
} from "@chakra-ui/react";
import toast, { Toaster } from "react-hot-toast";
import { doctorInstance } from "../../../utils/axios";
import { DOC_SIGN_UP } from "../../../utils/ConstUrls";

const DoctorRegister = () => {
  const options = [
    { value: "Cardiologist", label: "Cardiologist" },
    { value: "Dermatologist", label: "Dermatologist" },
    {
      value: "Neurologist",
      label: "Neurologist",
    },
    {
      value: "Oncologist",
      label: "Oncologist",
    },
  ];

  const exp = [
    { value: "0-1", label: "0-1" },
    { value: "1-2", label: "1-2" },
    { value: "2-3", label: "2-3" },
    { value: "3-4", label: "3-4" },
    { value: "above 4", label: "above 4" },
  ];

  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {

      await doctorInstance
        .post(DOC_SIGN_UP, values, {
          headers: { "Content-Type": "application/json" },
        })
        .then(({ data }) => {
          if (data.success) {
            navigate("/doctor-login");
          } else {
            toast.error("something went wrong");
          }
        });
    actions.resetForm();
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        fullName: "",
        email: "",
        password: "",
        date: "",
        number: "",
        specialization: "",
        experience: "",
        register: "",
      },
      validationSchema: doctorSignUpSchema,
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
          <Heading fontSize={"2xl"}>Register your account</Heading>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>Full name</FormLabel>
              <Input
                value={values.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                id="fullName"
                type="text"
                placeholder="Enter your fullName"
              />
              {errors.fullName && touched.fullName && (
                <p className="error">{errors.fullName}</p>
              )}
            </FormControl>

            <FormControl mt={6}>
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
              <FormLabel>Date of birth</FormLabel>
              <Input
                value={values.date}
                onChange={handleChange}
                onBlur={handleBlur}
                id="date"
                type="date"
                placeholder="Enter your Date of Birth"
              />
              {errors.date && touched.date && (
                <p className="error">{errors.date}</p>
              )}
            </FormControl>
            <FormControl mt={6}>
              <FormLabel>Contact Number</FormLabel>
              <Input
                value={values.number}
                onChange={handleChange}
                onBlur={handleBlur}
                id="number"
                type="number"
                placeholder="Enter your Number"
              />
              {errors.number && touched.number && (
                <p className="error">{errors.number}</p>
              )}
            </FormControl>

            <FormControl mt={6}>
              <FormLabel>Medical Register Number</FormLabel>
              <Input
                placeholder="Enter your Register Number"
                size="md"
                value={values.register}
                onChange={handleChange}
                onBlur={handleBlur}
                id="register"
                type="number"
              />
              {errors.register && touched.register && (
                <p className="error">{errors.register}</p>
              )}
            </FormControl>

            <FormControl mt={6}>
              <FormLabel>Qualification</FormLabel>
              <Select
                placeholder="Choose your Qualification"
                value={values.specialization}
                onChange={handleChange}
                onBlur={handleBlur}
                id="specialization"
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              {errors.specialization && touched.specialization && (
                <p className="error">{errors.specialization}</p>
              )}
            </FormControl>

            <FormControl mt={6}>
              <FormLabel>Experience</FormLabel>
              <Select
                placeholder="Choose your Experience in years"
                value={values.experience}
                onChange={handleChange}
                onBlur={handleBlur}
                id="experience"
              >
                {exp.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              {errors.experience && touched.experience && (
                <p className="error">{errors.experience}</p>
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
                  Already have an account?{" "}
                  <Link to="/doctor-login">Log in</Link>
                </Text>
              </Stack>
              <Button
                colorScheme={"blue"}
                variant={"solid"}
                type="submit"
                bg={"blue.500"}
              >
                SIGN IN
              </Button>
            </Stack>
          </form>
        </Stack>
      </Flex>
      <Toaster />
    </Stack>
  );
};

export default DoctorRegister;
