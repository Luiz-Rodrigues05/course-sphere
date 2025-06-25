import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';

import { getCourseFormStyles } from './styles';
import { courseSchema } from '../../../../schemas/courseSchema';

const CourseForm = ({ course, onSave, onDelete, onCancel, variant, onSuccess, onDeleteSuccess }) => {
  const theme = useTheme();
  const styles = getCourseFormStyles(theme);
  const { enqueueSnackbar } = useSnackbar();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(courseSchema),
    defaultValues: {
      name: '',
      description: '',
      start_date: '',
      end_date: '',
    },
  });

  useEffect(() => {
    if (variant === 'update' && course) {
      reset({
        name: course.name || '',
        description: course.description || '',
        start_date: course.start_date ? new Date(course.start_date).toISOString().split('T')[0] : '',
        end_date: course.end_date ? new Date(course.end_date).toISOString().split('T')[0] : '',
      });
    } else {
      reset({ name: '', description: '', start_date: '', end_date: '' });
    }
  }, [course, variant, reset]);

  const onSubmit = async (data) => {
    try {
      await onSave(data);
      enqueueSnackbar(`Curso ${variant === 'create' ? 'criado' : 'alterado'} com sucesso!`, { variant: 'success' });
      if (onSuccess) onSuccess();
    } catch (error) {
      enqueueSnackbar(error.message || `Erro ao ${variant === 'create' ? 'criar' : 'salvar'} o curso.`, { variant: 'error' });
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir este curso? Todas as aulas associadas também serão deletadas.')) {
      try {
        await onDelete(course.id);
        enqueueSnackbar('Curso deletado com sucesso!', { variant: 'success' });
        if (onDeleteSuccess) onDeleteSuccess();
      } catch (error) {
        enqueueSnackbar(error.message || 'Erro ao deletar o curso.', { variant: 'error' });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Nome do Curso"
            error={!!errors.name}
            helperText={errors.name?.message}
            required
            fullWidth
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Descrição"
            multiline
            rows={4}
            error={!!errors.description}
            helperText={errors.description?.message}
            inputProps={{ maxLength: 500 }}
            fullWidth
          />
        )}
      />
      <Controller
        name="start_date"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Data de Início"
            type="date"
            InputLabelProps={{ shrink: true }}
            error={!!errors.start_date}
            helperText={errors.start_date?.message}
            required
            fullWidth
          />
        )}
      />
      <Controller
        name="end_date"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Data de Fim"
            type="date"
            InputLabelProps={{ shrink: true }}
            error={!!errors.end_date}
            helperText={errors.end_date?.message}
            required
            fullWidth
          />
        )}
      />
      <Box sx={styles.actions}>
        <Button onClick={onCancel} sx={{ mr: 1 }}>
          Voltar
        </Button>
        {variant === 'update' && course && (
          <Button onClick={handleDelete} variant="contained" color="error" sx={{ mr: 1 }}>
            Deletar
          </Button>
        )}
        <Button type="submit" variant="contained" color="primary">
          {variant === 'create' ? 'Criar Curso' : 'Salvar Alterações'}
        </Button>
      </Box>
    </form>
  );
};

export default CourseForm;