import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login from "./components/pages/Login";
import Dashboard from "./components/pages/Dashboard";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Rota privada */}
          <Route 
            path="/dashboard" 
            element={<PrivateRoute component={Dashboard} />} 
          />

          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

function PrivateRoute({ component: Component }) {
  const { user } = useAuth();

  // Se o usuário não estiver logado, redireciona para o login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Se o usuário estiver logado, renderiza o componente desejado
  return <Component />;
}

export default App;
