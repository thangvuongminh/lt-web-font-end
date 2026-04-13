import * as yup from "yup";
let EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
export const schema = yup.object({
  email: yup
    .string()
    .email("Email invalid")
    .required("Email is required")
    .matches(EMAIL_REGEX, "Email invalid"),
  password: yup
    .string()
    .required("Password is required")
    .min(3, "Password must be at least 3 character")
    .max(50, "Password must be lower 50 character"),
  username: yup
    .string()
    .required("username is required")
    .min(3, "Password must be at least 3 character")
    .max(50, "Password must be lower 50 character"),
});
export const VALIDATE_LOGIN = yup.object({
  username: yup.string().required("Vui lòng nhập Username"),
  password: yup.string().required("Vui lòng nhập mật khẩu"),
});
export const VALIDATE_REGISTER = yup.object({
  username: yup
    .string()
    .min(3, "At least 3 characters")
    .required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(3, "At least 3 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords do not match")
    .required("Confirm password is required"),
});
export const VALIDATE_FORGOT_PASSWORD = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
});
export const VALIDATE_RESET_PASSWORD = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  otp: yup
    .string()
    .matches(/^[0-9]+$/, "OTP must be only digits")
    .required("OTP is required")
    .test("isOtp", "OTP must be exactly numbers", (value) => {
      return value.toString().length == 6;
    }),
  newPassword: yup
    .string()
    .min(3, "At least 3 characters")
    .required("New password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords do not match")
    .required("Confirm password is required"),
});
