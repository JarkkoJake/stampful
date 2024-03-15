import axios from "axios";
import React, { createContext, useState } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {

  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);

  React.useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }, [token]);

  return (
    <LoginContext.Provider
      value={{
        password,
        setPassword,
        token,
        setToken,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
