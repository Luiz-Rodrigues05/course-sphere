import React from 'react';
import styles from './Input.module.css';

const Input = ({ placeholder, value, onChange, type = 'text', name }) => {
  return (
    <div className={styles['input-container']}>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={styles.input}
      />
    </div>
  );
};

export default Input;
