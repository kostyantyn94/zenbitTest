import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email"),
  password: Yup.string()
    .min(4, "Password is too short")
    .max(50, "Password is too long")
    .required("Please enter your password"),
});
