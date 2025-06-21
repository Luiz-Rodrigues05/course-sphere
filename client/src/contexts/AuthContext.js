import React, { createContext, useState, useContext } from "react";

// Criando o contexto para autenticação
const AuthContext = createContext();

// Custom Hook para acessar o AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado para o usuário

  // Função para login
  const login = (userData) => {
    setUser(userData); // Armazena o usuário após o login
  };

  // Função para logout
  const logout = () => {
    setUser(null); // Limpa os dados do usuário
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
