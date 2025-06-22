import React from 'react';
import Heading from '../../../atoms/Heading';
import Button from '../../../atoms/Button';
import styles from './Course.module.css';

const CourseCard = ({ name, description, startDate, endDate }) => {
  return (
    <div className={styles.card}>
      <Heading text={name} level={4} />
      <p className={styles.description}>{description}</p>
      <div className={styles.dates}>
        <span>Início: {new Date(startDate).toLocaleDateString()}</span>
        <span>Fim: {new Date(endDate).toLocaleDateString()}</span>
      </div>
      <Button text="Ver detalhes" />
    </div>
  );
};

export default CourseCard;