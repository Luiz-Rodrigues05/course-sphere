import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCourse } from '../../../services/course';
import Header from '../../organisms/Header';
import Heading from '../../atoms/Heading';
import LessonList from '../../organisms/LessonList';
import styles from './CourseDetails.module.css';

const CourseDetails = () => {
  const { courseID } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      if (!courseID) return;
      try {
        setLoading(true);
        const { data } = await getCourse(courseID);
        setCourse(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourseDetails();
  }, [courseID]);

  if (loading) return <p>Carregando detalhes do curso...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!course) return <p>Curso não encontrado.</p>;

  return (
    <main className={styles.mainContent}>
    <Heading text={course.name} level={1} />
    <p className={styles.description}>{course.description}</p>
    <div className={styles.dates}>
        <span>Início: {new Date(course.start_date).toLocaleDateString()}</span>
        <span>Fim: {new Date(course.end_date).toLocaleDateString()}</span>
    </div>

    <LessonList courseID={courseID} />
    </main>
  );
};

export default CourseDetails;