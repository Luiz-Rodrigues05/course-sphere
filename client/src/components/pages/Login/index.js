import React from 'react';
import LoginCard from '../../organisms/Cards/Login';
import styles from './Login.module.css';

const LoginPage = () => {
  const handleLoginSubmit = (data) => {
    console.log('Login realizado com sucesso!', data);
  };

  return (
    <div className={styles['login-page']}>
      <LoginCard onSubmit={handleLoginSubmit} />
    </div>
  );
};

export default LoginPage;
