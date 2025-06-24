import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

import Login from '../components/pages/Login';
import Dashboard from '../components/pages/Dashboard';
import CoursePage from '../components/pages/Course';
import CreateCoursePage from '../components/pages/CreateCourse';
import EditCoursePage from '../components/pages/EditCourse';
import EditInstructorsPage from '../components/pages/EditInstructors';
import CreateLessonPage from '../components/pages/CreateLesson';
import EditLessonPage from '../components/pages/EditLesson';
import ProtectedLayout from '../components/layouts/ProtectedLayout';
import NotFound from '../components/pages/NotFound';
import Unauthorized from '../components/pages/Unauthorized';
import Forbidden from '../components/pages/Forbidden';

const AppRoutes = () => {
  const { user } = useAuth();

  if (user) {
    return (
      <Routes>
        {/* Redireciona usuários logados que tentarem acessar as páginas de login ou não autorizado */}
        <Route path="/login" element={<Navigate to="/dashboard" replace />} />
        <Route path="/unauthorized" element={<Navigate to="/dashboard" replace />} />

        {/* Rota para erros de permissão (usuário logado, mas sem acesso a um recurso específico) */}
        <Route path="/forbidden" element={<Forbidden />} />

        {/* Rotas protegidas, agora dentro do ProtectedLayout */}
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

        {/* A rota 404 (NotFound) só é alcançável por usuários logados */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  return (
    <Routes>
      {/* A única página que um usuário não logado pode ver é a de login */}
      <Route path="/login" element={<Login />} />

      {/* Qualquer outra rota, existente ou não, irá renderizar a tela de Não Autorizado (401).
        Isso cumpre a regra de que a 404 só aparece para usuários logados.
      */}
      <Route path="*" element={<Unauthorized />} />
    </Routes>
  );
};

export default AppRoutes;