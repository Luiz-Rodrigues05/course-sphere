import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { getCourseFormStyles } from './styles';

const CourseForm = ({ course, onSave, onDelete, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
  });
  const theme = useTheme();
  const styles = getCourseFormStyles(theme);

  useEffect(() => {
    if (course) {
      setFormData({
        name: course.name,
        description: course.description,
        start_date: new Date(course.start_date).toISOString().split('T')[0],
        end_date: new Date(course.end_date).toISOString().split('T')[0],
      });
    }
  }, [course]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <TextField
        name="name"
        label="Nome do Curso"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <TextField
        name="description"
        label="Descrição"
        value={formData.description}
        onChange={handleChange}
        multiline
        rows={4}
        required
      />
      <TextField
        name="start_date"
        label="Data de Início"
        type="date"
        value={formData.start_date}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        required
      />
      <TextField
        name="end_date"
        label="Data de Fim"
        type="date"
        value={formData.end_date}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        required
      />
      <Box sx={styles.actions}>
        <Box>
          <Button type="submit" variant="contained" color="primary">
            Salvar
          </Button>
          <Button onClick={onCancel} sx={{ ml: 1 }}>
            Cancelar
          </Button>
        </Box>
        {course && (
          <Button onClick={() => onDelete(course.id)} variant="contained" color="error">
            Deletar
          </Button>
        )}
      </Box>
    </form>
  );
};

export default CourseForm;