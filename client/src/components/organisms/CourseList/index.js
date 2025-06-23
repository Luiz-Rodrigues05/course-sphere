import React, { useState, useEffect } from 'react';
import { getCourses } from '../../../services/course';
import { useAuth } from '../../../contexts/AuthContext';
import { Box, Typography, Button, Grid, CircularProgress, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CourseCard from '../../molecules/Cards/Course';
import { getCourseListStyles } from './styles';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const theme = useTheme();
  const styles = getCourseListStyles(theme);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const coursesData = await getCourses(user.id);
        setCourses(coursesData.data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [user?.id]);

  const renderCourses = () => {
    if (loading) {
      return <Box sx={styles.feedbackContainer}><CircularProgress /></Box>;
    }
    if (error) {
      return <Alert severity="error">{error}</Alert>;
    }
    if (courses.length === 0) {
      return (
        <Box sx={styles.feedbackContainer}>
          <Typography>Nenhum curso encontrado para este usuário.</Typography>
        </Box>
      );
    }
    return (
      <Grid container spacing={3}>
        {courses.map(course => (
          <Grid item key={course.id} xs={12} sm={6} md={4}>
            <CourseCard course={course} />
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Box>
      <Box sx={styles.header}>
        <Typography variant="h5" component="h2">
          Meus Cursos
        </Typography>
        <Button variant="contained">
          Criar Novo Curso
        </Button>
      </Box>
      {renderCourses()}
    </Box>
  );
};

export default CourseList;