import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, List, ListItem, ListItemText, IconButton, CircularProgress } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { getInstructorsModalStyles } from './styles';
import { getCourseInstructors, updateInstructors } from '../../../services/course';
import { getRandomUser, createUser } from '../../../services/user';

const InstructorsModal = ({ open, onClose, course, onUpdate, showNotification }) => {
  const theme = useTheme();
  const styles = getInstructorsModalStyles(theme);

  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);

  const fetchInstructors = async () => {
    if (!course?.id) return;
    setLoading(true);
    try {
      const response = await getCourseInstructors(course.id);
      setInstructors(response.data);
    } catch (error) {
      showNotification(error.message || 'Erro ao buscar instrutores.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchInstructors();
    }
  }, [open, course]);

  const handleRemove = async (instructorId) => {
    const newInstructorIds = course.instructors.filter(id => id !== instructorId);
    try {
      await updateInstructors(course.id, { instructors: newInstructorIds });
      showNotification('Instrutor removido com sucesso!', 'success');
      onUpdate();
      onClose();
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
      await updateInstructors(course.id, { instructors: newInstructorIds });

      showNotification('Novo instrutor adicionado com sucesso!', 'success');
      onUpdate();
      onClose();
    } catch (error) {
      showNotification(error.message || 'Erro ao adicionar novo instrutor.', 'error');
    } finally {
      setAdding(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={styles.modalBox}>
        <Typography variant="h6" component="h2" gutterBottom>
          Gerenciar Instrutores
        </Typography>
        <Box sx={styles.list}>
          {loading ? <CircularProgress /> : (
            <List>
              {instructors.map(instructor => (
                <ListItem key={instructor.id} secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => handleRemove(instructor.id)}>
                    <Delete />
                  </IconButton>
                }>
                  <ListItemText primary={instructor.name} />
                </ListItem>
              ))}
              {instructors.length === 0 && <ListItem><ListItemText primary="Nenhum instrutor no curso." /></ListItem>}
            </List>
          )}
        </Box>
        <Box sx={styles.actions}>
          <Button onClick={handleAdd} variant="contained" disabled={adding}>
            {adding ? <CircularProgress size={24} /> : 'Adicionar Novo Instrutor'}
          </Button>
          <Button onClick={onClose}>Fechar</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default InstructorsModal;
