import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

const nameRules = /^[A-Za-z ]+$/;

const experienceRules = /^\d+-\d+$/;

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const userSignUpSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Password is required"),
  number: yup
    .string()
    .matches(/^[0-9]{10}$/, { message: "Number must be 10 characters" })
    .required("Contact is required"),
  userName: yup
    .string()
    .required("Name is required")
    .matches(nameRules, "Name can only contain alphabets"),
  date: yup
    .date()
    .required("Date of birth is required")
    .max(new Date(), "Date of birth cannot be in the future"),
});

export const doctorSignUpSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Password is required"),
  number: yup
    .string()
    .matches(/^[0-9]{10}$/, { message: "Number must be 10 characters" })
    .required("Contact is required"),

  fullName: yup
    .string()
    .required("Name is required")
    .matches(nameRules, "Name can only contain alphabets"),
  date: yup
    .date()
    .required("Date of birth is required")
    .max(new Date(), "Date of birth cannot be in the future"),
  specialization: yup.string().required("Specialization is required"),
  experience: yup.string().required("Experience is required"),
  register: yup
    .number()
    .positive()
    .integer()
    .required("Register number is required"),
});

export const userDetailsUpdateSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  number: yup
    .string()
    .matches(/^[0-9]{10}$/, { message: "Number must be 10 characters" })
    .required("Contact is required"),
  userName: yup.string().required("Name is required"),
});

export const changePasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
    .required("Required"),
});

export const doctorDetailsUpdateSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  number: yup
    .string()
    .matches(/^[0-9]{10}$/, { message: "Number must be 10 characters" })
    .required("Contact is required"),
  experience: yup
    .string()
    .required("Experience is required")
    .matches(experienceRules, "Enter a valid experience"),
  fullName: yup.string().required("Name is required"),
});
