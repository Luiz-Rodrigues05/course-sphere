import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Settings } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { getCourseInfoStyles } from './styles';

const CourseInfo = ({ course }) => {
  const theme = useTheme();
  const styles = getCourseInfoStyles(theme);
  const navigate = useNavigate();

  return (
    <Box>
      <Box sx={styles.titleContainer}>
        <Typography variant="h4" component="h1">
          {course.name}
        </Typography>
        
        {course.can_edit && (
          <IconButton 
            aria-label="Editar informações do curso" 
            size="small"
            onClick={() => navigate(`/courses/${course.id}/edit`)}
          >
            <Settings sx={{ fill: 'none', stroke: theme.palette.text.primary }}/>
          </IconButton>
        )}
      </Box>

      <Box sx={styles.descriptionContainer}>
        {course.description ? (
          <Typography variant="body1" component="p" sx={styles.description}>
            <strong>Descrição:</strong> {course.description}
          </Typography>
        ) : (
          <Typography variant="body1" component="p" sx={styles.emptyDescription}>
            (Sem descrição disponível)
          </Typography>
        )}
      </Box>
      
      <Typography variant="body2" color="text.secondary">
        <strong>Início:</strong> {new Date(course.start_date).toLocaleDateString()}
        <strong style={{ marginLeft: '16px' }}>Fim:</strong> {new Date(course.end_date).toLocaleDateString()}
      </Typography>
    </Box>
  );
};

export default CourseInfo;