import React from 'react';
import styles from './Heading.module.css'; // Importando o CSS Module

const Heading = ({ text, level = 1 }) => {
  const Tag = `h${level}`;
  return <Tag className={styles.heading}>{text}</Tag>;
};

export default Heading;
