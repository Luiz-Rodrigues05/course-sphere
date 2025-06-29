import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Typography, Card, CardMedia, CardContent, CardActions, Chip, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useTheme } from '@mui/material/styles';
import { getLessonCardStyles } from './styles';

const LessonCard = ({ lesson }) => {
  const theme = useTheme();
  const styles = getLessonCardStyles(theme);

  const videoId = lesson.video_url?.split('v=')[1]?.split('&')[0];
  const thumbnailUrl = videoId 
    ? `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`
    : 'https://via.placeholder.com/320x180.png?text=Video+Indisponível';

  return (
    <Card sx={styles.card}>
      <CardMedia
        component="img"
        sx={styles.thumbnail}
        image={thumbnailUrl}
        alt={lesson.title}
      />
      <CardContent sx={styles.info}>
        <Typography sx={styles.title} variant="h6" component="h4">
          {lesson.title}
        </Typography>
      </CardContent>

      <CardActions sx={styles.actions}>
        <Chip
          label={lesson.status === 'published' ? 'Publicada' : 'Rascunho'}
          color={lesson.status === 'published' ? 'success' : 'default'}
          size="small"
        />
        { lesson.can_edit && (
          <IconButton 
            aria-label="edit lesson" 
            size="small" 
            component={RouterLink}
            to={`/lessons/${lesson.id}/edit`}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
};

export default LessonCard;