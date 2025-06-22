import React, { useState } from 'react';
import Input from '../../../atoms/Input';
import Button from '../../../atoms/Button';
import { useSnackbar } from 'notistack';
import styles from './Login.module.css';

const LoginForm = ({ onSubmit, loading }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const showError = (message) => {
    enqueueSnackbar(message, { variant: 'error' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email && !password) {
      showError('Email e senha são obrigatórios.');
      return;
    }

    if (!email) {
      showError('O email é obrigatório.');
      return;
    }

    if (!password) {
      showError('A senha é obrigatória.');
      return;
    }

    onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className={styles['login-form']}>
      <Input
        placeholder="E-mail"
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Senha"
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" disabled={loading}>{loading ? "Carregando..." : "Entrar"}</Button>
    </form>
  );
};

export default LoginForm;
