import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Box, Container, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import LoginCard from '../../molecules/Cards/Login';
import { useAuth } from '../../../contexts/AuthContext';
import { login } from '../../../services/user';
import { loginPageStyles } from './styles';

const LoginPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const { login: setUser } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();

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

  const styles = {
    container: loginPageStyles.container(theme),
    welcomeTitle: loginPageStyles.welcomeTitle(theme),
    welcomeSubtitle: loginPageStyles.welcomeSubtitle(theme),
  };

  return (
    <Container 
      component="main" 
      maxWidth={false} 
      disableGutters
      sx={styles.container}
    >
      <Box sx={loginPageStyles.welcomeBox}>
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
      <LoginCard onSubmit={handleLoginSubmit} loading={loading} />
    </Container>
  );
};

export default LoginPage;
