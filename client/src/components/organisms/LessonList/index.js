import React, { useState, useEffect } from 'react';
import { getLessons } from '../../../services/lesson';
import Heading from '../../atoms/Heading';
import Input from '../../atoms/Input';
import Pagination from '../../molecules/Pagination';
import LessonCard from '../../molecules/Cards/Lesson';
import styles from './LessonList.module.css';

const LESSONS_PER_PAGE = 5;

const LessonList = ({ courseID }) => {
  const [lessons, setLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalLessons, setTotalLessons] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

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

  return (
    <div className={styles.lessonsSection}>
      <Heading text="Aulas" level={2} />

      <div className={styles.filterBar}>
        <Input
          placeholder="Buscar pelo título da aula..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="">Todos os Status</option>
          <option value="published">Publicadas</option>
          <option value="draft">Rascunho</option>
        </select>
      </div>

      {isLoading ? (
        <p>Carregando aulas...</p>
        ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
        ) : lessons.length > 0 ? (
        <div className={styles.gridContainer}>
            {lessons.map(lesson => <LessonCard key={lesson.id} lesson={lesson} />)}
        </div>
        ) : (
        <p>Nenhuma aula encontrada para os filtros selecionados.</p>
    )}

      <Pagination
        currentPage={currentPage}
        totalCount={totalLessons}
        pageSize={LESSONS_PER_PAGE}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default LessonList;