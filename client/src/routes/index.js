import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Importe suas páginas...
import Login from '../components/pages/Login';
import Dashboard from '../components/pages/Dashboard';
import CoursePage from '../components/pages/Course';
import CreateCoursePage from '../components/pages/CreateCourse';
import EditCoursePage from '../components/pages/EditCourse';
import EditInstructorsPage from '../components/pages/EditInstructors';
import CreateLessonPage from '../components/pages/CreateLesson';
import EditLessonPage from '../components/pages/EditLesson';
import NotFound from '../components/pages/NotFound';
import Forbidden from '../components/pages/Forbidden';

import ProtectedLayout from '../components/layouts/ProtectedLayout';

const AuthGuard = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/index.html" element={<Navigate to="/dashboard" replace />} />

      <Route element={<AuthGuard />}>
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses/new" element={<CreateCoursePage />} />
          <Route path="/courses/:courseID" element={<CoursePage />} />
          <Route path="/courses/:courseID/edit" element={<EditCoursePage />} />
          <Route path="/courses/:courseID/instructors/edit" element={<EditInstructorsPage />} />
          <Route path="/courses/:courseID/lessons/new" element={<CreateLessonPage />} />
          <Route path="/lessons/:lessonID/edit" element={<EditLessonPage />} />
        </Route>

        <Route path="/forbidden" element={<Forbidden />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;