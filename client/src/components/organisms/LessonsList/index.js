import React, { useState, useEffect, useCallback } from 'react';
import {
  Box, Typography, TextField, Select, MenuItem, FormControl, 
  InputLabel, CircularProgress, Alert, Pagination, Stack, Button
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LessonCard from '../../molecules/Cards/Lesson';
import { getLessonsListStyles } from './styles';
import { getLessons } from '../../../services/lesson';
import { debounce } from '../../../services/debounce';

const LESSONS_PER_PAGE = 1;

const LessonsList = ({ courseID }) => {
  const theme = useTheme();
  const styles = getLessonsListStyles(theme);
  const [lessons, setLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalLessons, setTotalLessons] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const debouncedSetSearch = useCallback(debounce(setDebouncedSearchTerm, 500), []);

  useEffect(() => {
    debouncedSetSearch(searchTerm);
  }, [searchTerm, debouncedSetSearch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, statusFilter]);

  useEffect(() => {
    if (!courseID) return;
    const fetchLessons = async () => {
      setIsLoading(true);
      const params = {
        _page: currentPage,
        _limit: LESSONS_PER_PAGE,
        q: debouncedSearchTerm || undefined,
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
  }, [courseID, currentPage, debouncedSearchTerm, statusFilter]);
  
  const totalPages = Math.ceil(totalLessons / LESSONS_PER_PAGE);

  return (
    <Box sx={styles.lessonsSection}>
      <Box sx={styles.sectionHeader}>
        <Typography variant="h5" component="h3">
          Aulas
        </Typography>
        <Button variant="contained" size="small">
          Criar Nova Aula
        </Button>
      </Box>

      <Stack direction="row" spacing={2} sx={styles.filterBar}>
        <TextField
          label="Buscar pelo título da aula"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1 }}
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

      <Box sx={{ ...styles.contentContainer, justifyContent: lessons.length > 0 && !isLoading ? 'flex-start' : 'center' }}>
        {isLoading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error" sx={{ width: '100%' }}>{error}</Alert>
        ) : lessons.length > 0 ? (
          <Box sx={styles.gridContainer}>
            {lessons.map(lesson => <LessonCard key={lesson.id} lesson={lesson} />)}
          </Box>
        ) : (
          <Typography>Nenhuma aula encontrada para os filtros selecionados.</Typography>
        )}
      </Box>

      {totalLessons > 0 && (
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

export default LessonsList;