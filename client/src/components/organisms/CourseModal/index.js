import React from 'react';
import { Modal, Box, Typography, useTheme } from '@mui/material';
import CourseForm from '../../molecules/Forms/Course';
import { getCourseModalStyles } from './styles';

const CourseModal = ({ open, onClose, course, onSave, onDelete }) => {
  const theme = useTheme();
  const styles = getCourseModalStyles(theme);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="course-modal-title"
      aria-describedby="course-modal-description"
    >
      <Box sx={styles.modalBox}>
        <Typography id="course-modal-title" variant="h6" component="h2" gutterBottom>
          {course ? 'Editar Curso' : 'Criar Novo Curso'}
        </Typography>
        <CourseForm
          course={course}
          onSave={onSave}
          onDelete={onDelete}
          onCancel={onClose}
        />
      </Box>
    </Modal>
  );
};

export default CourseModal;