import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { getCourses } from '../../../services/course';
import { useAuth } from '../../../contexts/AuthContext';
import { Box, Typography, Button, Grid, CircularProgress, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CourseCard from '../../molecules/Cards/Course';
import { getCoursesListStyles } from './styles';

const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useAuth();
  const theme = useTheme();
  const listStyles = getCoursesListStyles(theme);

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

  useEffect(() => {
    fetchCourses();
  }, [user?.id]);

  const renderCourses = () => {
    if (loading) {
      return <Box sx={listStyles.feedbackContainer}><CircularProgress /></Box>;
    }
    if (courses.length === 0 && !error) {
      return (
        <Box sx={listStyles.feedbackContainer}>
          <Typography>Nenhum curso encontrado para este usuário.</Typography>
        </Box>
      );
    }
    return (
      <Grid 
        container 
        spacing={3} 
        sx={{ 
          justifyContent: { xs: 'center', sm: 'center' } 
        }}
      >
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
      <Box sx={listStyles.header}>
        <Typography variant="h4" component="h2">
          Meus Cursos
        </Typography>
        <Button
          component={RouterLink}
          to="/courses/new"
          variant="contained"
          sx={{ marginTop: theme.spacing(2) }}
        >
          Criar Novo Curso
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>}
      
      {renderCourses()}
    </Box>
  );
};

export default CoursesList;