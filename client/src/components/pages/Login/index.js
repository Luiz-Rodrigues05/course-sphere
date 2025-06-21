import React from 'react';
import LoginCard from '../../organisms/Cards/Login';
import Heading from '../../atoms/Heading';
import styles from './Login.module.css';

const LoginPage = () => {
  const handleLoginSubmit = (data) => {
    console.log('Login realizado com sucesso!', data);
  };

  return (
    <div className={styles['login-page']}>
      <div className={styles['welcome-text']}>
        <Heading text="Bem-vindo(a) à CourseSphere!" level={1} />
      </div>
      <LoginCard onSubmit={handleLoginSubmit} />
    </div>
  );
};

export default LoginPage;
