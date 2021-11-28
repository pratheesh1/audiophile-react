import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import UserContext from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { apiBaseUrl } from "../api/link";
import axios from "axios";
import { toast } from "react-toastify";
import { loginFormSchema } from "../validators/form";

function Login() {
  //state
  const { token, setToken } = useContext(UserContext);
  const [postError, setPostError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  //form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginFormSchema),
  });

  useEffect(() => {
    //redirect
    if (postError) {
      if (!postError?.response?.status === 401) {
        navigate("/404");
      }
    } else if (token) {
      setTimeout(() => {
        //FIXME:navigate to home if the user directly access this page, if not go to the last page
        navigate(-1);
      }, 2000);
    }
  }, [postError, token, navigate]);

  //submit
  const onSubmit = async (formData) => {
    const { confirmPassword, ...userData } = formData;
    const signupToast = toast.loading("Logging you in...");
    try {
      const user = await axios.post(`${apiBaseUrl}/users/login`, userData);
      toast.update(signupToast, {
        render: "Login successful!",
        type: "success",
        isLoading: false,
        closeButton: true,
        autoClose: 4000,
      });
      user && setToken(user.data);
    } catch (err) {
      const errorMsg =
        err?.response?.status === 401
          ? "Invalid email or password. Please try again."
          : "Login failed! Please try again";
      toast.update(signupToast, {
        render: errorMsg,
        type: "error",
        isLoading: false,
        closeButton: true,
        autoClose: 5000,
      });
      setTimeout(() => {
        err && setPostError(err);
      }, 9000);
    }
  };

  return (
    <>
      <section className="w-full min-h-screen bg-login bg-no-repeat bg-cover bg-center flex items-center justify-center pt-4">
        <div className="w-1/2 h-full hidden lg:block lg:pl-20 xl:pl-40">
          {/* Welcome message for login page */}
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-white text-left lg:text-3xl xl:text-4xl font-bold mb-14 drop-shadow-2xl">
              Welcome to{" "}
              <span className="text-primary">
                Audiophile. Your one stop shop for all things music.
              </span>
            </h1>
          </div>
        </div>
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center lg:items-end justify-center h-full">
            <div className="w-full lg:w-1/2 max-w-sm pb-10">
              <div className="bg-white px-6 pt-6 pb-8 mb-4 rounded-lg shadow-lg">
                <div className="mb-4">
                  <h1 className="text-center text-2xl font-bold">Login</h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* email */}
                  <div className="mb-4">
                    <label className="signup-form-label" htmlFor="Email">
                      Email
                    </label>
                    <input
                      className="signup-form"
                      id="Email"
                      {...register("email")}
                      type="text"
                      placeholder="Email"
                    />
                    {errors.email && (
                      <p className="signup-form-error">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  {/* password */}
                  <div className="mb-6 relative">
                    <label className="signup-form-label" htmlFor="password">
                      Password
                      <span
                        role="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={`fa fa-fw fa-eye ${
                          showPassword ? "fa-eye-slash" : ""
                        } field-icon toggle-password absolute top-10 right-2`}
                      ></span>
                    </label>
                    <input
                      className="mb-3 signup-form"
                      id="password"
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                      placeholder="******************"
                    />
                    {errors.password && (
                      <p className="signup-form-error">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <Link
                      to="/register"
                      className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                    >
                      Not a member?
                      <span className="underline px-1">Sign Up</span>
                    </Link>
                    <button
                      className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline whitespace-nowrap"
                      type="submit"
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
