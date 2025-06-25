import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Box, Typography } from '@mui/material';
import WelcomeSvg from '../../../assets/images/welcome.svg';
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
      <Box sx={{ ...styles.leftPanel, flexDirection: 'column' }}>
        <Box sx={{ textAlign: 'center', mb: { md: 3, lg: 5 } }}>
          <Typography 
            component="h1" 
            sx={{ 
              fontWeight: 'bold',
              fontSize: { md: '2.2rem', lg: '2.75rem' } 
            }}
          >
            Bem vindo à CourseSphere
          </Typography>
          <Typography 
            component="p"
            sx={{ 
              mt: 1, 
              color: 'text.secondary',
              fontSize: { md: '1.1rem', lg: '1.25rem' }
            }}
          >
            A sua plataforma para gerenciar e participar de cursos de forma colaborativa.
          </Typography>
        </Box>
        <Box
          component="img"
          src={WelcomeSvg} 
          alt="Ilustração de boas-vindas da CourseSphere"
          sx={styles.svgImage}
        />
      </Box>

      <Box sx={styles.rightPanel}>
        <Typography
          variant="h4"
          component="h1"
          sx={{ ...styles.mobileHeader, display: 'block' }}
        >
          CourseSphere
        </Typography>
        
        <Box sx={styles.cardBox}>
          <LoginCard onSubmit={handleLoginSubmit} loading={loading} />
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;