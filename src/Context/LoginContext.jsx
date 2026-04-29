import { createContext, useContext, useState } from "react";

const LoginContext = createContext(null);

export const useLogin = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (name, password) => {
    if (!name || !password) {
      return false;
    }

    const formattedName = name
      .trim()
      .split(/\s+/)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");

    setUser({ name: formattedName });
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <LoginContext.Provider value={{ user, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
};
