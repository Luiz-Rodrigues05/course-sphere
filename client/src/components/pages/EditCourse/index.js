import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCourse, updateCourse, deleteCourse } from '../../../services/course';
import CourseForm from '../../molecules/Forms/Course';
import { Paper, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { getEditCoursePageStyles } from './styles';

const EditCoursePage = () => {
  const { courseID } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const styles = getEditCoursePageStyles(theme);

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        const response = await getCourse(courseID);
        setCourse(response.data);
      } catch (err) {
        setError('Não foi possível carregar os dados do curso.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseID]);

  const handleUpdateCourse = async (data) => {
    try {
      await updateCourse(courseID, data);
      navigate('/dashboard');
    } catch (err) {
      console.error('Erro ao atualizar o curso:', err);
    }
  };

  const handleDeleteCourse = async () => {
    try {
        await deleteCourse(courseID);
        navigate('/dashboard');
        } catch (err) {
        console.error('Erro ao excluir o curso:', err);
    }
  };

  if (loading) {
    return (
      <Box sx={styles.feedbackContainer}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={styles.feedbackContainer}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={styles.wrapper}>
      <Paper component="div" elevation={3}>
        <Box sx={styles.formContainer}>
          <Typography variant="h4" component="h1" gutterBottom>
            Editar Curso
          </Typography>

          <CourseForm
            variant="update"
            course={course}
            onSave={handleUpdateCourse}
            onDelete={handleDeleteCourse}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default EditCoursePage;