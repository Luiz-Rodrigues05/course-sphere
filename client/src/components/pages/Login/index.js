import React, { useState } from 'react';
import LoginCard from '../../organisms/Cards/Login';
import Heading from '../../atoms/Heading';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../services/users';
import { useAuth } from '../../../contexts/AuthContext';
import { useSnackbar } from 'notistack';

const LoginPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login: setUser } = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = async (data) => {
    const { email, password } = data;
    
    setLoading(true);
    setError('');

    if (!email && !password) {
      enqueueSnackbar('Email e senha são obrigatórios.', { variant: 'error' });
      setLoading(false);
      return;
    }

    if (!email) {
      enqueueSnackbar('O email é obrigatório.', { variant: 'error' });
      setLoading(false);
      return;
    }

    if (!password) {
      enqueueSnackbar('A senha é obrigatória.', { variant: 'error' });
      setLoading(false);
      return;
    }

    try {
      const user = await login(email, password);
      setUser(user);
      navigate('/dashboard');
    } catch (err) {
      enqueueSnackbar(err.message, { variant: 'error' });
    }

    setLoading(false);
  };

  return (
    <div className={styles['login-page']}>
      <div className={styles['welcome-text']}>
        <Heading text="Bem-vindo(a) à CourseSphere!" level={1} />
      </div>
      <LoginCard onSubmit={handleLoginSubmit} loading={loading} />
    </div>
  );
};

export default LoginPage;
