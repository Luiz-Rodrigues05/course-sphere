import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Settings } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { getCourseInfoStyles } from './styles';

const CourseInfo = ({ course, canEdit }) => {
  const theme = useTheme();
  const styles = getCourseInfoStyles(theme);
  const navigate = useNavigate();

  return (
    <Box>
      <Box sx={styles.titleContainer}>
        <Typography variant="h4" component="h1">
          {course.name}
        </Typography>
        
        {canEdit && (
          <IconButton 
            aria-label="Editar informações do curso" 
            size="small"
            onClick={() => navigate(`/courses/${course.id}/edit`)}
          >
            <Settings sx={{ color: theme.palette.text.primary }}/>
          </IconButton>
        )}
      </Box>

      <Typography variant="body1" component="p" sx={{ mb: 2 }}>
        <strong>Descrição:</strong> {course.description}
      </Typography>
      
      <Typography variant="body2" color="text.secondary">
        <strong>Início:</strong> {new Date(course.start_date).toLocaleDateString()}
        <strong style={{ marginLeft: '16px' }}>Fim:</strong> {new Date(course.end_date).toLocaleDateString()}
      </Typography>
    </Box>
  );
};

export default CourseInfo;