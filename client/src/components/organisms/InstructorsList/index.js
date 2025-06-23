import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Card, CardContent, Button, 
  CircularProgress, Alert, Pagination, Grid
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { getCourseInstructors } from '../../../services/course';
import { getInstructorListStyles } from './styles';
import InstructorCard from '../../molecules/Cards/Instructor'; // Importe o novo card

const INSTRUCTORS_PER_PAGE = 3;

const InstructorsList = ({ courseID }) => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalInstructors, setTotalInstructors] = useState(0);

  const theme = useTheme();
  const styles = getInstructorListStyles(theme);

  useEffect(() => {
    if (!courseID) return;

    const fetchInstructors = async () => {
      setLoading(true);
      const params = {
        _page: currentPage,
        _limit: INSTRUCTORS_PER_PAGE,
      };
      try {
        const response = await getCourseInstructors(courseID, params);
        const instructorsWithImages = response.data.map(instructor => ({
          ...instructor,
          imageUrl: `https://i.pravatar.cc/150?u=${instructor.id}`
        }));
        setInstructors(instructorsWithImages);
        setTotalInstructors(parseInt(response.headers['x-total-count'], 10) || 0);
        setError(null);
      } catch (err) {
        setError(err.message || 'Erro ao carregar instrutores.');
      } finally {
        setLoading(false);
      }
    };

    fetchInstructors();
  }, [courseID, currentPage]);

  const totalPages = Math.ceil(totalInstructors / INSTRUCTORS_PER_PAGE);

  const renderContent = () => {
    if (loading) {
      return <CircularProgress sx={{ display: 'block', margin: 'auto' }} />;
    }
    if (error) {
      return <Alert severity="error">{error}</Alert>;
    }
    if (instructors.length === 0) {
      return <Typography color="text.secondary">(Nenhum instrutor neste curso)</Typography>;
    }
    return (
      <Grid container spacing={2} sx={styles.instructorsGrid}>
        {instructors.map((instructor) => (
          <Grid item key={instructor.id} xs={12} sm={4}>
            <InstructorCard instructor={instructor} />
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Box>
      <Box sx={styles.sectionHeader}>
        <Typography variant="h5" component="h2">
          Instrutores
        </Typography>
        <Button variant="outlined" size="small">Gerenciar</Button>
      </Box>
      {renderContent()}
      {totalPages > 1 && (
        <Box sx={styles.paginationContainer}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, page) => setCurrentPage(page)}
            size="small"
          />
        </Box>
      )}
    </Box>
  );
};

export default InstructorsList;