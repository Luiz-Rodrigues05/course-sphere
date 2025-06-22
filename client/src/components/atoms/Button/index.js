import React from 'react';
import styles from './Button.module.css';

const Button = ({ text, onClick, type = 'button', disabled = false }) => {
  return (
    <button className={styles.btn} type={type} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
