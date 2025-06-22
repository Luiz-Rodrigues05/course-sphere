import React, { useState, useEffect } from 'react';
import CourseCard from '../../molecules/Cards/Course';
import Heading from '../../atoms/Heading';
import Button from '../../atoms/Button';
import styles from './CourseList.module.css';

import { getCourses } from '../../../services/course';
import { useAuth } from '../../../contexts/AuthContext';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCourses = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const coursesData = await getCourses(user.id);
        setCourses(coursesData);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Falha ao buscar cursos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [user?.id]);

  if (loading) {
    return <p>Carregando cursos...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div className={styles.courseListContainer}>
      <div className={styles.header}>
        <Heading text="Meus Cursos" level={2} />
        <Button>Criar Novo Curso</Button>
      </div>
      <div className={styles.grid}>
        {courses.length > 0 ? (
          courses.map(course => (
            <CourseCard
              course={course}
            />
          ))
        ) : (
          <p>Nenhum curso encontrado para este usuário.</p>
        )}
      </div>
    </div>
  );
};

export default CourseList;