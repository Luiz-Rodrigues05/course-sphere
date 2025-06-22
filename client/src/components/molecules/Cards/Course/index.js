import React from 'react';
import Heading from '../../../atoms/Heading';
import Button from '../../../atoms/Button';
import styles from './Course.module.css';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  const { id, name, description, start_date, end_date } = course;
  
  return (
    <div className={styles.card}>
      <Heading text={name} level={4} />
      <p className={styles.description}>{description}</p>
      <div className={styles.dates}>
        <span>Início: {new Date(start_date).toLocaleDateString()}</span>
        <span>Fim: {new Date(end_date).toLocaleDateString()}</span>
      </div>
      <Link to={`/courses/${id}`} className={styles.detailsLink}>
        <Button>Ver detalhes</Button>
      </Link>
    </div>
  );
};

export default CourseCard;