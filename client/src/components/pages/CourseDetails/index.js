import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCourse } from '../../../services/course';
import Heading from '../../atoms/Heading';
import Header from '../../organisms/Header';
import styles from './CourseDetails.module.css';

const CourseDetails = () => {
  const { courseID } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        const courseData = await getCourse(courseID);
        setCourse(courseData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseID]);

  if (loading) {
    return <p>Carregando detalhes do curso...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!course) {
    return <p>Curso não encontrado.</p>;
  }

  return (
    <div className={styles.courseDetailsPage}>
      <Header />
      <main className={styles.mainContent}>
        <Heading text={course.name} level={1} />
        <p className={styles.description}>{course.description}</p>
        <div className={styles.dates}>
          <span>Início: {new Date(course.start_date).toLocaleDateString()}</span>
          <span>Fim: {new Date(course.end_date).toLocaleDateString()}</span>
        </div>
      </main>
    </div>
  );
};

export default CourseDetails;