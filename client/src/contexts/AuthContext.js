import React, { createContext, useState, useContext, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const getInitialUser = () => {
  try {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getInitialUser());
  const navigate = useNavigate();

  const login = useCallback((userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("user");
    setUser(null);
    navigate('/login');
  }, [navigate]);
  
  const memoizedValue = useMemo(() => ({
    user,
    login,
    logout
  }), [user, login, logout]);

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
};