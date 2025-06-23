import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCourse } from '../../../services/course';
import { Box, CircularProgress, Alert, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { getCoursePageStyles } from './styles';

import CourseInfo from '../../organisms/CourseInfo';
import InstructorsList from '../../organisms/InstructorsList';
import LessonsList from '../../organisms/LessonsList';

const CoursePage = () => {
  const { courseID } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const styles = getCoursePageStyles(theme);

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
      <Stack spacing={4}>
        <CourseInfo course={course} />
        <InstructorsList courseID={courseID} />
        <LessonsList courseID={courseID} />
      </Stack>
    </Box>
  );
};

export default CoursePage;