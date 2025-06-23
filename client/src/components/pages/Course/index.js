import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCourse } from '../../../services/course';
import { 
  Box, Typography, CircularProgress, Alert, Stack, 
  Card, CardContent, Button, Divider 
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LessonList from '../../organisms/LessonsList';
import { getCourseDetailsStyles } from './styles';

const CourseDetails = () => {
  const { courseID } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const styles = getCourseDetailsStyles(theme);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      if (!courseID) return;
      try {
        setLoading(true);
        const { data } = await getCourse(courseID);
        setCourse(data);
      } catch (err) {
        setError(err.message || 'Ocorreu um erro ao buscar os detalhes do curso.');
      } finally {
        setLoading(false);
      }
    };
    fetchCourseDetails();
  }, [courseID]);

  // Os retornos de loading e error permanecem os mesmos
  if (loading) {
    return (
      <Box sx={styles.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return (
      <Box sx={styles.mainContent}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }
  if (!course) {
    return (
      <Box sx={styles.mainContent}>
        <Alert severity="warning">Curso não encontrado.</Alert>
      </Box>
    );
  }

  return (
    <Box component="main" sx={styles.mainContent}>
      {/* Seção 1: Informações do Curso */}
      <Box sx={styles.sectionHeader}>
        <Typography variant="h5" component="h2">
          Informações do Curso
        </Typography>
        <Button variant="outlined" size="small">Editar</Button>
      </Box>
      <Card sx={styles.sectionCard}>
        <CardContent>
          <Typography variant="h4" component="h1">{course.name}</Typography>
          <Typography sx={styles.description}>{course.description}</Typography>
          <Stack direction="row" spacing={2.5} sx={styles.dates}>
            <Typography variant="body2">
              Início: {new Date(course.start_date).toLocaleDateString()}
            </Typography>
            <Typography variant="body2">
              Fim: {new Date(course.end_date).toLocaleDateString()}
            </Typography>
          </Stack>
        </CardContent>
      </Card>

      <Divider sx={{ mb: 3 }} />

      {/* Seção 2: Instrutores */}
      <Box sx={styles.sectionHeader}>
        <Typography variant="h5" component="h2">
          Instrutores
        </Typography>
        <Button variant="outlined" size="small">Gerenciar</Button>
      </Box>
      <Card sx={styles.sectionCard}>
        <CardContent>
          <Typography sx={styles.instructorList} color="text.secondary">
            (Aqui será exibida a lista de instrutores do curso)
          </Typography>
        </CardContent>
      </Card>

      <Divider sx={{ mb: 3 }} />
      
      {/* Seção 3: Aulas */}
      <Box sx={styles.sectionHeader}>
        <Typography variant="h5" component="h2">
          Aulas do Curso
        </Typography>
        <Button variant="contained" size="small">Criar Nova Aula</Button>
      </Box>
      <LessonList courseID={courseID} />
    </Box>
  );
};

export default CourseDetails;