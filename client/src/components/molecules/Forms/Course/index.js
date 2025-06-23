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
  const [errors, setErrors] = useState({});
  const theme = useTheme();
  const styles = getCourseFormStyles(theme);

  useEffect(() => {
    if (course) {
      setFormData({
        name: course.name || '',
        description: course.description || '',
        start_date: course.start_date ? new Date(course.start_date).toISOString().split('T')[0] : '',
        end_date: course.end_date ? new Date(course.end_date).toISOString().split('T')[0] : '',
      });
    } else {
      setFormData({ name: '', description: '', start_date: '', end_date: '' });
    }
    setErrors({});
  }, [course]);

  const validate = () => {
    let tempErrors = {};
    
    // Validação do nome
    if (!formData.name.trim()) {
      tempErrors.name = 'O nome do curso é obrigatório.';
    } else if (formData.name.trim().length < 3) {
      tempErrors.name = 'O nome deve ter pelo menos 3 caracteres.';
    }

    // Validação da descrição
    if (formData.description && formData.description.length > 500) {
      tempErrors.description = 'A descrição não pode exceder 500 caracteres.';
    }

    // Validação das datas
    if (!formData.start_date) {
      tempErrors.start_date = 'A data de início é obrigatória.';
    }
    if (!formData.end_date) {
      tempErrors.end_date = 'A data de fim é obrigatória.';
    } else if (formData.start_date && formData.end_date && new Date(formData.end_date) <= new Date(formData.start_date)) {
      tempErrors.end_date = 'A data de fim deve ser posterior à data de início.';
    }

    setErrors(tempErrors);
    // Retorna true se não houver erros
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <TextField
        name="name"
        label="Nome do Curso"
        value={formData.name}
        onChange={handleChange}
        error={!!errors.name}
        helperText={errors.name}
        required
      />
      <TextField
        name="description"
        label="Descrição"
        value={formData.description}
        onChange={handleChange}
        multiline
        rows={4}
        error={!!errors.description}
        helperText={errors.description}
        inputProps={{ maxLength: 500 }}
      />
      <TextField
        name="start_date"
        label="Data de Início"
        type="date"
        value={formData.start_date}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        error={!!errors.start_date}
        helperText={errors.start_date}
        required
      />
      <TextField
        name="end_date"
        label="Data de Fim"
        type="date"
        value={formData.end_date}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        error={!!errors.end_date}
        helperText={errors.end_date}
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