import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getLesson, updateLesson, deleteLesson } from '../../../services/lesson';
import LessonForm from '../../molecules/Forms/Lesson';
import { Paper, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { getEditLessonPageStyles } from './styles';

const EditLessonPage = () => {
  const { lessonID } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const styles = getEditLessonPageStyles(theme);

  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLessonData = async () => {
      try {
        setLoading(true);
        const response = await getLesson(lessonID); 
        setLesson(response.data);
      } catch (err) {
        setError('Não foi possível carregar os dados da aula.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLessonData();
  }, [lessonID]);

  const navigateBackToCourse = () => {
    if (lesson?.course_id) {
      navigate(`/courses/${lesson.course_id}`);
    } else {
      navigate('/dashboard');
    }
  };

  const handleUpdate = async (data) => {
    try {
      await updateLesson(lessonID, data);
      navigateBackToCourse();
    } catch (err) {
      console.error('Erro ao atualizar a aula:', err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir esta aula?')) {
      try {
        await deleteLesson(lessonID);
        navigateBackToCourse();
      } catch (err) {
        console.error('Erro ao excluir a aula:', err);
      }
    }
  };

  const handleCancel = () => {
    navigateBackToCourse();
  };

  if (loading) {
    return <Box sx={styles.feedbackContainer}><CircularProgress /></Box>;
  }

  if (error) {
    return <Box sx={styles.feedbackContainer}><Alert severity="error">{error}</Alert></Box>;
  }

  return (
    <Box sx={styles.wrapper}>
      <Paper component="div" elevation={3}>
        <Box sx={styles.container}>
          <Typography variant="h4" component="h1" gutterBottom>
            Editar Aula
          </Typography>
          <LessonForm
            variant="update"
            lesson={lesson}
            onSave={handleUpdate}
            onDelete={handleDelete}
            onCancel={handleCancel}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default EditLessonPage;