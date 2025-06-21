import React, { useState } from 'react';
import LoginCard from '../../organisms/Cards/Login';
import Heading from '../../atoms/Heading';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLoginSubmit = async (data) => {
    const { email, password } = data;

    setLoading(true);
    setError('');

    // Requisição para o JSON Server
    try {
      const response = await fetch('http://localhost:5000/users'); // Supondo que o JSON Server esteja rodando na porta 5000
      const users = await response.json();

      // Verificando se o usuário existe
      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        // Usuário autenticado com sucesso
        console.log('Login realizado com sucesso!', user);
        navigate('/dashboard');
      } else {
        // Usuário não encontrado
        setError('Credenciais inválidas.');
      }
    } catch (err) {
      console.error('Erro ao fazer a requisição:', err);
      setError('Erro ao tentar fazer login. Tente novamente.');
    }

    setLoading(false);
  };

  return (
    <div className={styles['login-page']}>
      <div className={styles['welcome-text']}>
        <Heading text="Bem-vindo(a) à CourseSphere!" level={1} />
      </div>
      <LoginCard onSubmit={handleLoginSubmit} />
      {loading && <p>Carregando...</p>}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default LoginPage;
