import React from 'react';
import LoginForm from '../../../molecules/Forms/Login';
import styles from './Login.module.css';

const LoginCard = ({ onSubmit }) => {
  return (
    <div className={styles['login-card']}>
      <h2>Bem-vindo(a) à CourseSphere!</h2>
      <LoginForm onSubmit={onSubmit} />
    </div>
  );
};

export default LoginCard;
