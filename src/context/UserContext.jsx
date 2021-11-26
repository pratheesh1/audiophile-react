import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { apiBaseUrl } from "../api/link";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //check if local storage has token
  useEffect(() => {
    const token = localStorage.getItem("token");
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
          console.log(error);
        }
      };
      getUser();
      //save to local storage
      if (!localStorage.getItem("token")) {
        localStorage.setItem("token", token);
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
            console.log(error);
          }
        };
        refresh();
      }, 1000 * 60 * 50);

      //cleanup - clear interval when component unmounts
      return () => clearInterval(refreshToken);
    }
  }, [token]);

  //logout and clear local storage
  useEffect(() => {
    //remove token from local storage when user logs out
    if (!isLoggedIn) {
      localStorage.removeItem("token");
      setToken(null);
      setUser(null);
    }
  }, [isLoggedIn]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        setIsLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
