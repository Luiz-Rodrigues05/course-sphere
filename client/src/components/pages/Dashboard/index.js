import React from "react";
import { useAuth } from "../../../contexts/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h2>Bem-vindo, {user.name}!</h2>
      <button onClick={logout}>Sair</button>
    </div>
  );
};

export default Dashboard;
