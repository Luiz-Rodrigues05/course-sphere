import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AppRoutes from "./routes";
import { SnackbarProvider } from "notistack";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthProvider>
      <SnackbarProvider maxSnack={3}>
        <Router>
          <AppRoutes />
        </Router>
      </SnackbarProvider>
    </AuthProvider>
  );
}

export default App;
