import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { apiBaseUrl } from "../api/link";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  //state
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [postError, setPostError] = useState(null);
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState(false);

  //check if local storage has token
  useEffect(() => {
    const localToken = localStorage.getItem("token");
    const token = JSON.parse(localToken);
    if (token) {
      setToken(token);
    }
  }, []);

  //if token is set, get user data
  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const { data } = await axios.get(`${apiBaseUrl}/users`, {
            headers: {
              Authorization: `Bearer ${token.accessToken}`,
            },
          });
          data && setUser(data.user);
          data && setIsLoggedIn(true);
        } catch (error) {
          toast.error("Error getting user data. Please login again.", {
            toastId: "getUser",
            autoClose: 4000,
          });
        }
      };
      getUser();
      //save to local storage
      if (!localStorage.getItem("token")) {
        localStorage.token = JSON.stringify(token);
      }
    }

    //refresh token every 50 minutes
    if (token) {
      const refreshToken = setInterval(() => {
        const refresh = async () => {
          try {
            const { accessToken } = await axios.post(
              `${apiBaseUrl}/users/refresh`,
              {
                refreshToken: token.refreshToken,
              }
            );
            setToken(...token, accessToken);
          } catch (error) {
            toast.error("Error connecting to server. Please login again.", {
              toastId: "refreshToken",
              autoClose: 4000,
            });
          }
        };
        refresh();
      }, 1000 * 60 * 50);

      //cleanup - clear interval when component unmounts
      return () => clearInterval(refreshToken);
    }
  }, [token]);

  //logout and clear token
  useEffect(() => {
    //remove token from local storage when user logs out
    if (!isLoggedIn) {
      localStorage.removeItem("token");
      setToken(null);
      setUser(null);
    }
  }, [isLoggedIn]);

  //error handling
  useEffect(() => {
    //redirect
    if (postError) {
      if (!postError?.response?.status === 401) {
        navigate("/404");
      }
    }
  }, [postError, navigate]);

  /*********************** Helper Functions ***********************/

  //login error handling and redirect
  const redirect = () => {
    setTimeout(() => {
      if (newUser) {
        setNewUser(false);
        navigate("/");
      } else {
        navigate(-1);
      }
    }, 1500);
  };

  /*
   * @desc: signup
   * @param: {object} userData
   * @param: {string} userData.firstName
   * @param: {string} userData.lastName
   * @param: {string} userData.email
   * @param: {string} userData.password
   */

  async function signup(userData) {
    const signupToast = toast.loading("Signing you up...");
    try {
      const userToken = await axios.post(
        `${apiBaseUrl}/users/register`,
        userData
      );
      toast.update(signupToast, {
        render: "Signup successful! Redirecting...",
        type: "success",
        isLoading: false,
        closeButton: true,
        autoClose: 3000,
      });
      userToken && setToken(userToken.data);
      userToken && setNewUser(true);
      redirect();
    } catch (err) {
      const errorMsg =
        err?.response?.status === 401
          ? "An account with this email already exists. Please login."
          : "Signup failed! Please try again";
      toast.update(signupToast, {
        render: errorMsg,
        type: "error",
        isLoading: false,
        closeButton: true,
        closeOnClick: true,
      });
      setTimeout(() => {
        err && setPostError(err);
      }, 9000);
    }
  }

  /*
   * @desc: login
   * @param: {object} userData
   * @param: {string} userData.email
   * @param: {string} userData.password
   */
  async function login(userData) {
    const signupToast = toast.loading("Logging you in...");
    try {
      const userToken = await axios.post(`${apiBaseUrl}/users/login`, userData);
      toast.update(signupToast, {
        render: "Login successful!",
        type: "success",
        isLoading: false,
        closeButton: true,
        autoClose: 4000,
      });
      userToken && setToken(userToken.data);
      userToken && setNewUser(false);
      redirect();
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
  }

  /*********************** End of Helper Functions ***********************/

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        isLoggedIn,
        setIsLoggedIn,
        signup,
        login,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
