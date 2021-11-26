import * as yup from "yup";

//password special char validation for yup
yup.addMethod(yup.string, "specialChar", function (message) {
  return this.test("specialChar", message, function (value) {
    return /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value);
  });
});
//test password to include number
yup.addMethod(yup.string, "numberTest", function (message) {
  return this.test("numberTest", message, function (value) {
    return /[0-9]/.test(value);
  });
});
//test password to include uppercase and lowercase
yup.addMethod(yup.string, "upperLowerCase", function (message) {
  return this.test("upperLowerCase", message, function (value) {
    return /[A-Z]/.test(value) && /[a-z]/.test(value);
  });
});

export const loginFormSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required!")
    .email("Please enter a valid email!"),
  password: yup.string().required("Password is required!"),
});

export const signupFormSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required!")
    .email("Please enter a valid email!"),
  password: yup
    .string()
    .required("Password is required!")
    .min(8, "Password must be at least 8 characters!")
    .specialChar("Password must contain at least one special character!")
    .numberTest("Password must contain at least one number!")
    .upperLowerCase(
      "Password must contain at least one uppercase and lowercase letter!"
    )
    .max(20, "Password must be less than 20 characters!"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords do not match!"),
  firstName: yup.string().required("First name is required!"),
  lastName: yup.string().required("Last name is required!"),
});
