import React, { useState, useEffect } from 'react';
import { getLessons } from '../../../services/lesson';
import {
  Box, Typography, TextField, Select, MenuItem, FormControl, 
  InputLabel, CircularProgress, Alert, Pagination, Stack
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LessonCard from '../../molecules/Cards/Lesson';
import { getLessonListStyles } from './styles';

const LESSONS_PER_PAGE = 5;

const LessonList = ({ courseID }) => {
  const [lessons, setLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalLessons, setTotalLessons] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const theme = useTheme();
  const styles = getLessonListStyles(theme);

  useEffect(() => {
    if (!courseID) return;

    const fetchLessons = async () => {
      setIsLoading(true);
      const params = {
        _page: currentPage,
        _limit: LESSONS_PER_PAGE,
        q: searchTerm || undefined,
        status: statusFilter || undefined,
      };
      try {
        const response = await getLessons(courseID, params);
        setLessons(response.data);
        setTotalLessons(parseInt(response.headers['x-total-count'], 10) || 0);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLessons();
  }, [courseID, currentPage, searchTerm, statusFilter]);
  
  const totalPages = Math.ceil(totalLessons / LESSONS_PER_PAGE);

  return (
    <Box sx={styles.lessonsSection}>
      <Typography variant="h4" component="h2" gutterBottom>
        Aulas
      </Typography>

      <Stack direction="row" spacing={2} sx={styles.filterBar}>
        <TextField
          label="Buscar pelo título da aula"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
        />
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel id="status-filter-label">Status</InputLabel>
          <Select
            labelId="status-filter-label"
            label="Status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="">Todos os Status</MenuItem>
            <MenuItem value="published">Publicadas</MenuItem>
            <MenuItem value="draft">Rascunho</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {isLoading ? (
        <Box sx={styles.feedbackContainer}><CircularProgress /></Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : lessons.length > 0 ? (
        <Box sx={styles.gridContainer}>
          {lessons.map(lesson => <LessonCard key={lesson.id} lesson={lesson} />)}
        </Box>
      ) : (
        <Box sx={styles.feedbackContainer}>
          <Typography>Nenhuma aula encontrada para os filtros selecionados.</Typography>
        </Box>
      )}

      {totalPages > 1 && (
        <Box sx={styles.paginationContainer}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, page) => setCurrentPage(page)}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};

export default LessonList;