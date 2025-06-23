import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Box, Typography } from '@mui/material'; // Container não é mais necessário aqui
import { useTheme } from '@mui/material/styles';

import LoginCard from '../../molecules/Cards/Login';
import { useAuth } from '../../../contexts/AuthContext';
import { login } from '../../../services/user';
import { getLoginPageStyles } from './styles';

const LoginPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const { login: setUser } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const styles = getLoginPageStyles(theme);

  const handleLoginSubmit = async (data) => {
    const { email, password } = data;
    
    setLoading(true);

    if (!email || !password) {
      enqueueSnackbar('Email e senha são obrigatórios.', { variant: 'error' });
      setLoading(false);
      return;
    }

    try {
      const user = await login(email, password);
      setUser(user.data);
      navigate('/dashboard');
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Ocorreu um erro. Tente novamente.';
      enqueueSnackbar(errorMessage, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="main" sx={styles.container}>

      <Box sx={styles.welcomeBox}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={styles.welcomeTitle}
        >
          Bem-vindo(a) à CourseSphere!
        </Typography>
        <Typography 
          variant="body1" 
          sx={styles.welcomeSubtitle}
        >
          A sua plataforma para gerenciar e participar de cursos de forma colaborativa.
        </Typography>
      </Box>

      <Box sx={styles.cardBox}>
        <LoginCard onSubmit={handleLoginSubmit} loading={loading} />
      </Box>
    </Box>
  );
};

export default LoginPage;
