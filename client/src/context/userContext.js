import { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";

import axios from "axios";
// Create Context for User
const UserContext = createContext();

// Create Provider for User
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  const setActiveUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    try {
      axios.get("/user/destroy-session").then((res) => {
        console.log(res.data);
        toast.success("Logged out successfully!");
      });
    } catch (error) {
      // console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <UserContext.Provider value={{ user, setActiveUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Create Hook for User Context
export const useUserContext = () => useContext(UserContext);
