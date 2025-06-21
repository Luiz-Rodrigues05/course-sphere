import React from 'react';
import styles from './Button.module.css';

const Button = ({ text, onClick, type = 'button' }) => {
  return (
    <button className={styles.btn} type={type} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
