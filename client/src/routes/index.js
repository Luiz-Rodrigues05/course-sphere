import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Login from '../components/pages/Login';
import Dashboard from '../components/pages/Dashboard';

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Se o usuário não estiver logado, redireciona para /login */}
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
      
      {/* Rota privada que exige que o usuário esteja logado */}
      <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
      
      {/* Rota padrão, redireciona para /login */}
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;
