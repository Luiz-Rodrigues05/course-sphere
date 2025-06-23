import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCourse } from '../../../services/course';
import { Box, Typography, CircularProgress, Alert, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LessonList from '../../organisms/LessonList';
import { getCourseDetailsStyles } from './styles';

const CourseDetails = () => {
  const { courseID } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const styles = getCourseDetailsStyles(theme);

  useEffect(() => {
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
    fetchCourseDetails();
  }, [courseID]);

  if (loading) {
    return (
      <Box sx={styles.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={styles.mainContent}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }
  
  if (!course) {
    return (
      <Box sx={styles.mainContent}>
        <Alert severity="warning">Curso não encontrado.</Alert>
      </Box>
    );
  }

  return (
    <Box component="main" sx={styles.mainContent}>
      <Typography variant="h4" component="h1" gutterBottom>
        {course.name}
      </Typography>
      <Typography sx={styles.description}>
        {course.description}
      </Typography>
      
      <Stack direction="row" spacing={2.5} sx={styles.dates}>
        <Typography variant="body2">
          Início: {new Date(course.start_date).toLocaleDateString()}
        </Typography>
        <Typography variant="body2">
          Fim: {new Date(course.end_date).toLocaleDateString()}
        </Typography>
      </Stack>

      <LessonList courseID={courseID} />
    </Box>
  );
};

export default CourseDetails;