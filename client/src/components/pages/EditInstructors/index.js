import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Paper, Typography, Box, Button, List, ListItem, ListItemText,
  IconButton, CircularProgress, Alert
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { getEditInstructorsPageStyles } from './styles';
import { getCourse, getCourseInstructors, updateInstructors } from '../../../services/course';
import { getRandomUser, createUser } from '../../../services/user';

const EditInstructorsPage = () => {
  const { courseID } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const styles = getEditInstructorsPageStyles(theme);

  const [course, setCourse] = useState(null);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });

  const fetchPageData = useCallback(async () => {
    if (!courseID) return;
    setLoading(true);
    try {
      const courseResponse = await getCourse(courseID);
       if (courseResponse.data.can_edit === false) {
        navigate('/forbidden');
        return; 
      }
      setCourse(courseResponse.data);

      const instructorsResponse = await getCourseInstructors(courseID);
      setInstructors(instructorsResponse.data);
    } catch (error) {
      setNotification({ open: true, message: error.message || 'Erro ao buscar dados.', severity: 'error' });
    } finally {
      setLoading(false);
    }
  }, [courseID]);

  useEffect(() => {
    fetchPageData();
  }, [fetchPageData]);

  const showNotification = (message, severity) => {
    setNotification({ open: true, message, severity });
    setTimeout(() => setNotification({ open: false, message: '', severity: 'info' }), 6000);
  };

  const handleRemove = async (instructorId) => {
    const newInstructorIds = course.instructors.filter(id => id !== instructorId);
    try {
      await updateInstructors(courseID, { instructors: newInstructorIds });
      showNotification('Instrutor removido com sucesso!', 'success');
      fetchPageData(); // Re-fetch all data to ensure consistency
    } catch (error) {
      showNotification(error.message || 'Erro ao remover instrutor.', 'error');
    }
  };

  const handleAdd = async () => {
    setAdding(true);
    try {
      const randomUser = await getRandomUser();
      const { name, email, login } = randomUser;

      const newLocalUser = await createUser({
        name: `${name.first} ${name.last}`,
        email: email,
        password: login.password,
      });

      const newInstructorIds = [...course.instructors, newLocalUser.id];
      await updateInstructors(courseID, { instructors: newInstructorIds });
      showNotification('Novo instrutor adicionado com sucesso!', 'success');
      fetchPageData(); // Re-fetch all data
    } catch (error) {
      showNotification(error.message || 'Erro ao adicionar novo instrutor.', 'error');
    } finally {
      setAdding(false);
    }
  };

  return (
    <Box sx={styles.wrapper}>
      <Paper elevation={3}>
        <Box sx={styles.container}>
          <Typography variant="h4" component="h1" gutterBottom>
            Gerenciar Instrutores
          </Typography>

          {notification.open && (
            <Alert severity={notification.severity} sx={{ mb: 2 }}>
              {notification.message}
            </Alert>
          )}

          <Box sx={styles.listContainer}>
            {loading ? (
              <Box sx={styles.feedbackContainer}><CircularProgress /></Box>
            ) : (
              <List>
                {instructors.map(instructor => (
                  <ListItem key={instructor.id} secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => handleRemove(instructor.id)}>
                      <Delete />
                    </IconButton>
                  }>
                    <ListItemText primary={instructor.name} secondary={instructor.email} />
                  </ListItem>
                ))}
                {instructors.length === 0 && !loading && (
                  <ListItem><ListItemText primary="Nenhum instrutor associado a este curso." /></ListItem>
                )}
              </List>
            )}
          </Box>

          <Box sx={styles.actions}>
            <Button onClick={() => navigate(`/courses/${courseID}`)}>
              Voltar ao Curso
            </Button>
            <Button onClick={handleAdd} variant="contained" disabled={adding || loading}>
              {adding ? <CircularProgress size={24} /> : 'Adicionar Novo Instrutor'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default EditInstructorsPage;