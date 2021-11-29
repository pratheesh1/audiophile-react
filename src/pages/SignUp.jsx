import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupFormSchema } from "../validators/form";
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SignUp() {
  //state
  const { signup, user } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  //form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupFormSchema),
  });

  //submit
  const onSubmit = (formData) => {
    const { confirmPassword, ...userData } = formData;
    signup(userData);
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
                  <h1 className="text-center text-2xl font-bold">Sign Up</h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* first name */}
                  <div className="mb-4">
                    <label className="signup-form-label" htmlFor="firstName">
                      First Name
                    </label>
                    <input
                      className="signup-form"
                      id="firstName"
                      type="text"
                      {...register("firstName")}
                      placeholder="First Name"
                    />
                    {errors.firstName && (
                      <p className="signup-form-error">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  {/* last name */}
                  <div className="mb-4">
                    <label className="signup-form-label" htmlFor="lastName">
                      Last Name
                    </label>
                    <input
                      className="signup-form"
                      id="lastName"
                      type="text"
                      {...register("lastName")}
                      placeholder="Last Name"
                    />
                    {errors.lastName && (
                      <p className="signup-form-error">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
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
                  {/* confirm password */}
                  <div className="mb-6 relative">
                    <label className="signup-form-label" htmlFor="password">
                      Confirm Password
                      <span
                        role="button"
                        onClick={() => setShowConfPassword(!showConfPassword)}
                        className={`fa fa-fw fa-eye ${
                          showConfPassword ? "fa-eye-slash" : ""
                        } field-icon toggle-password absolute top-10 right-2`}
                      ></span>
                    </label>
                    <input
                      className="mb-3 signup-form"
                      id="password"
                      type={showConfPassword ? "text" : "password"}
                      {...register("confirmPassword")}
                      placeholder="******************"
                    />
                    {errors.confirmPassword && (
                      <p className="signup-form-error">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <Link
                      to="/login"
                      className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                    >
                      Already have an account?{" "}
                      <span className="underline px-1">Sign In</span>
                    </Link>
                    <button
                      className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline whitespace-nowrap"
                      type="submit"
                    >
                      Sign Up
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

export default SignUp;
