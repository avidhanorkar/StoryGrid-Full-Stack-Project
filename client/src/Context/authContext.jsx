import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize user as null

  useEffect(() => {
    const userData = localStorage.getItem("token");
    if (userData) {
      const decodedUser = jwtDecode(userData);
      setUser(decodedUser); // Set the decoded user data
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null); // Reset user state to null
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
