import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { getLessonFormStyles } from './styles';

const LessonForm = ({ lesson, onSave, onDelete, onCancel, variant = 'create' }) => {
  const [formData, setFormData] = useState({
    title: '',
    status: 'draft',
    publish_date: '',
    video_url: '',
  });
  const [errors, setErrors] = useState({});
  const theme = useTheme();
  const styles = getLessonFormStyles(theme);

  useEffect(() => {
    if (variant === 'update' && lesson) {
      setFormData({
        title: lesson.title || '',
        status: lesson.status || 'draft',
        publish_date: lesson.publish_date ? new Date(lesson.publish_date).toISOString().split('T')[0] : '',
        video_url: lesson.video_url || '',
      });
    } else {
      setFormData({ title: '', status: 'draft', publish_date: '', video_url: '' });
    }
    setErrors({});
  }, [lesson, variant]);

  const validate = () => {
    let tempErrors = {};
    if (!formData.title.trim()) tempErrors.title = 'O título é obrigatório.';
    if (!formData.publish_date) tempErrors.publish_date = 'A data de publicação é obrigatória.';
    if (!formData.video_url.trim()) {
      tempErrors.video_url = 'A URL do vídeo é obrigatória.';
    } else {
      try {
        new URL(formData.video_url);
      } catch (_) {
        tempErrors.video_url = 'A URL do vídeo é inválida.';
      }
    }
    setErrors(tempErrors);
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
        name="title"
        label="Título da Aula"
        value={formData.title}
        onChange={handleChange}
        error={!!errors.title}
        helperText={errors.title}
        required
      />
      <FormControl fullWidth required error={!!errors.status}>
        <InputLabel id="status-label">Status</InputLabel>
        <Select
          labelId="status-label"
          name="status"
          value={formData.status}
          label="Status"
          onChange={handleChange}
        >
          <MenuItem value="draft">Rascunho</MenuItem>
          <MenuItem value="published">Publicada</MenuItem>
        </Select>
      </FormControl>
      <TextField
        name="publish_date"
        label="Data de Publicação"
        type="date"
        value={formData.publish_date}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        error={!!errors.publish_date}
        helperText={errors.publish_date}
        required
      />
      <TextField
        name="video_url"
        label="URL do Vídeo"
        value={formData.video_url}
        onChange={handleChange}
        error={!!errors.video_url}
        helperText={errors.video_url}
        required
      />
      <Box sx={styles.actions}>
        <Box>
          <Button type="submit" variant="contained" color="primary">
            {variant === 'create' ? 'Criar Aula' : 'Salvar Alterações'}
          </Button>
          <Button onClick={onCancel} sx={{ ml: 1 }}>
            Cancelar
          </Button>
        </Box>
        {variant === 'update' && lesson && (
          <Button onClick={() => onDelete(lesson.id)} variant="contained" color="error">
            Deletar
          </Button>
        )}
      </Box>
    </form>
  );
};

export default LessonForm;