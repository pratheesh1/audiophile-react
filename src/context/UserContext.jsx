import { createContext, useState } from "react";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

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
