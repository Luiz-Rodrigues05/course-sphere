import React from 'react';
import LoginForm from '../../../molecules/Forms/Login';
import styles from './Login.module.css';

const LoginCard = ({ onSubmit, loading }) => {
  return (
    <div className={styles['login-card']}>
      <LoginForm loading={loading} onSubmit={onSubmit} />
    </div>
  );
};

export default LoginCard;
