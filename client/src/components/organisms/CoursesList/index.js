import React, { useState, useEffect } from 'react';
import { getCourses, createCourse, updateCourse, deleteCourse } from '../../../services/course';
import { useAuth } from '../../../contexts/AuthContext';
import { Box, Typography, Button, Grid, CircularProgress, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CourseCard from '../../molecules/Cards/Course';
import CourseModal from '../CourseModal';
import { getCoursesListStyles } from './styles';

const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const { user } = useAuth();
  const theme = useTheme();
  const listStyles = getCoursesListStyles(theme);

  const fetchCourses = async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const coursesData = await getCourses(user.id);
      setCourses(coursesData.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [user?.id]);

  const handleOpenModal = (course = null) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedCourse(null);
    setIsModalOpen(false);
  };

  const handleSaveCourse = async (courseData) => {
    try {
      if (selectedCourse) {
        await updateCourse(selectedCourse.id, courseData);
      } else {
        const newCourseData = {
          ...courseData,
          creator_id: user.id,
          instructors: [],
        };
        await createCourse(newCourseData);
      }
      fetchCourses();
      handleCloseModal();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      await deleteCourse(courseId);
      fetchCourses();
      handleCloseModal();
    } catch (err) {
      setError(err.message);
    }
  };

  const renderCourses = () => {
    if (loading) {
      return <Box sx={listStyles.feedbackContainer}><CircularProgress /></Box>;
    }
    if (courses.length === 0 && !error) {
      return (
        <Box sx={listStyles.feedbackContainer}>
          <Typography>Nenhum curso encontrado para este usuário.</Typography>
        </Box>
      );
    }
    return (
      <Grid container spacing={3}>
        {courses.map(course => (
          <Grid item key={course.id} xs={12} sm={6} md={4}>
            <CourseCard course={course} onEdit={handleOpenModal} />
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Box>
      <Box sx={listStyles.header}>
        <Typography variant="h5" component="h2">
          Meus Cursos
        </Typography>
        <Button
          variant="contained"
          sx={{ marginTop: theme.spacing(2) }}
          onClick={() => handleOpenModal()}
        >
          Criar Novo Curso
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>}
      
      {renderCourses()}

      <CourseModal
        open={isModalOpen}
        onClose={handleCloseModal}
        course={selectedCourse}
        onSave={handleSaveCourse}
        onDelete={handleDeleteCourse}
      />
    </Box>
  );
};

export default CoursesList;