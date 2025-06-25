import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCourse } from '../../../services/course';
import { useAuth } from '../../../contexts/AuthContext';
import { Box, CircularProgress, Alert, Stack, Snackbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { getCoursePageStyles } from './styles';

import CourseInfo from '../../organisms/CourseInfo';
import InstructorsList from '../../organisms/InstructorsList';
import LessonsList from '../../organisms/LessonsList';

const CoursePage = () => {
  const { courseID } = useParams();
  const { user } = useAuth();
  
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
        <CourseInfo course={course} canEdit={canEdit} />
        <InstructorsList
          course={course}
          canEdit={canEdit}
          onUpdate={fetchCourseDetails}
          showNotification={showNotification}
        />
        <LessonsList courseID={courseID} canEdit={canEdit} />
      </Stack>
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
