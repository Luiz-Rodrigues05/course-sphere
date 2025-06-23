import React from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { getCourseInfoStyles } from './styles';

const CourseInfo = ({ course }) => {
  const theme = useTheme();
  const styles = getCourseInfoStyles(theme);

  return (
    <Box>
      <Box sx={styles.sectionHeader}>
        <Typography variant="h5" component="h2">
          Informações do Curso
        </Typography>
        <Button variant="outlined" size="small">Editar</Button>
      </Box>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h3" gutterBottom>
            <strong>Nome:</strong> {course.name}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Descrição:</strong> {course.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Início:</strong> {new Date(course.start_date).toLocaleDateString()}
            <strong style={{ marginLeft: '16px' }}>Fim:</strong> {new Date(course.end_date).toLocaleDateString()}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CourseInfo;