import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { createCourse } from '../../../services/course';
import CourseForm from '../../molecules/Forms/Course';
import { Paper, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { getCreateCoursePageStyles } from './styles';

const CreateCoursePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const theme = useTheme();
  const styles = getCreateCoursePageStyles(theme);

  const handleCreateCourse = async (data) => {
    try {
      const payload = {
        ...data,
        creator_id: user.id,
        instructors: [],
      };
      await createCourse(payload);
      navigate('/dashboard');
    } catch (error) {
      console.error("Erro ao criar o curso:", error);
    }
  };

  return (
    <Box sx={styles.wrapper}>
      <Paper component="div" elevation={3}>
        <Box sx={styles.formContainer}>
          <Typography variant="h4" component="h1" gutterBottom>
            Criar Novo Curso
          </Typography>

          <CourseForm
            variant="create"
            onSave={handleCreateCourse}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default CreateCoursePage;