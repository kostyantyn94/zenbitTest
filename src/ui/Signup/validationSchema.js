import * as Yup from "yup";

export const signUpSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email"),
  password: Yup.string()
    .min(4, "Password is too short")
    .max(50, "Password is too long")
    .required("Please enter your password"),
  repeatPassword: Yup.string().required("Please repeat your password"),
});
