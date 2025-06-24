import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createLesson } from '../../../services/lesson';
import LessonForm from '../../molecules/Forms/Lesson';
import { Paper, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { getCreateLessonPageStyles } from './styles';
import { useAuth } from '../../../contexts/AuthContext';

const CreateLessonPage = () => {
  const { courseID } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const styles = getCreateLessonPageStyles(theme);
  const { user } = useAuth();

  const handleCreateLesson = async (data) => {
    try {
      const payload = {
        ...data,
        courseId: parseInt(courseID, 10),
        creatorId: user.id, // Adiciona o ID do criador
      };
      await createLesson(payload);
      navigate(`/courses/${courseID}`);
    } catch (error) {
      console.error("Erro ao criar a aula:", error);
    }
  };

  const handleCancel = () => {
    navigate(`/courses/${courseID}`);
  };

  return (
    <Box sx={styles.wrapper}>
      <Paper component="div" elevation={3}>
        <Box sx={styles.container}>
          <Typography variant="h4" component="h1" gutterBottom>
            Criar Nova Aula
          </Typography>
          <LessonForm
            variant="create"
            onSave={handleCreateLesson}
            onCancel={handleCancel}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default CreateLessonPage;