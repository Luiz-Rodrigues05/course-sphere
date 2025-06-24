import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

import Login from '../components/pages/Login';
import Dashboard from '../components/pages/Dashboard';
import CoursePage from '../components/pages/Course';
import CreateCoursePage from '../components/pages/CreateCourse';
import ProtectedLayout from '../components/layouts/ProtectedLayout';

const AuthGuard = () => {
  const { user } = useAuth();
  return user ? <ProtectedLayout /> : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<AuthGuard />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses/:courseID" element={<CoursePage />} />
        <Route path="/courses/new" element={<CreateCoursePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default AppRoutes;
