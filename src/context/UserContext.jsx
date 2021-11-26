import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { apiBaseUrl } from "../api/link";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

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
        } catch (error) {
          console.log(error);
        }
      };
      getUser();
    }
  }, [token]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
