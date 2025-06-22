import React from 'react';
import styles from './Button.module.css';

const Button = ({ children, onClick, type = 'button', variant = 'primary', size = 'medium' }) => {
  const buttonClass = `${styles.btn} ${styles[variant]} ${styles[size]}`;

  return (
    <button type={type} onClick={onClick} className={buttonClass}>
      {children}
    </button>
  );
};

export default Button;