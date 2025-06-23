import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourse, updateCourse, deleteCourse } from '../../../services/course';
import { useAuth } from '../../../contexts/AuthContext';
import { Box, CircularProgress, Alert, Stack, Snackbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { getCoursePageStyles } from './styles';

import CourseInfo from '../../organisms/CourseInfo';
import InstructorsList from '../../organisms/InstructorsList';
import LessonsList from '../../organisms/LessonsList';
import CourseModal from '../../organisms/CourseModal';

const CoursePage = () => {
  const { courseID } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  const theme = useTheme();
  const styles = getCoursePageStyles(theme);

  const fetchCourseDetails = async () => {
    if (!courseID) return;
    try {
      setLoading(true);
      const { data } = await getCourse(courseID);
      setCourse(data);
    } catch (err) {
      setError(err.message || 'Ocorreu um erro ao buscar os detalhes do curso.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseDetails();
  }, [courseID]);

  const showNotification = (message, severity = 'error') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSaveCourse = async (courseData) => {
    try {
      await updateCourse(course.id, courseData);
      await fetchCourseDetails(); // Re-fetch para atualizar a UI
      handleCloseModal();
      showNotification('Curso atualizado com sucesso!', 'success');
    } catch (err) {
      showNotification(err.message || 'Erro ao atualizar o curso.', 'error');
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      await deleteCourse(courseId);
      showNotification('Curso deletado com sucesso!', 'success');
      navigate('/dashboard');
    } catch (err) {
      showNotification(err.message || 'Erro ao deletar o curso.', 'error');
    }
  };

  if (loading) {
    return <Box sx={styles.loadingContainer}><CircularProgress /></Box>;
  }
  if (error) {
    return <Box sx={styles.mainContent}><Alert severity="error">{error}</Alert></Box>;
  }
  if (!course) {
    return <Box sx={styles.mainContent}><Alert severity="warning">Curso não encontrado.</Alert></Box>;
  }
  
  const canEdit = user?.id === course.creator_id;

  return (
    <Box component="main" sx={styles.mainContent}>
      <Stack spacing={4}>
        <CourseInfo course={course} onEdit={handleOpenModal} canEdit={canEdit} />
        <InstructorsList
          course={course}
          canEdit={canEdit}
          onUpdate={fetchCourseDetails}
          showNotification={showNotification}
        />
        <LessonsList courseID={courseID} canEdit={canEdit} />
      </Stack>

      {course && (
        <CourseModal
          open={isModalOpen}
          onClose={handleCloseModal}
          course={course}
          onSave={handleSaveCourse}
          onDelete={handleDeleteCourse}
          onValidationFail={showNotification}
        />
      )}
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CoursePage;
