import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Card, CardContent, CardActions, 
  Typography, Button, Box 
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { getCourseCardStyles } from './styles';

const CourseCard = ({ course }) => {
  const { id, name, description, start_date, end_date } = course;
  const theme = useTheme();
  const styles = getCourseCardStyles(theme);

  return (
    <Card sx={styles.card}>
      <CardContent sx={styles.cardContent}>
        <Typography variant="h6" component="h2" gutterBottom>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={styles.description}>
          {description}
        </Typography>
        <Box sx={styles.dates}>
          <Typography variant="caption">
            Início: {new Date(start_date).toLocaleDateString()}
          </Typography>
          <Typography variant="caption">
            Fim: {new Date(end_date).toLocaleDateString()}
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={styles.cardActions}>
        <Button 
          component={RouterLink} 
          to={`/courses/${id}`} 
          size="small"
        >
          Ver Detalhes
        </Button>
      </CardActions>
    </Card>
  );
};

export default CourseCard;