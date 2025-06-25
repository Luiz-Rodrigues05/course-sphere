import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import WelcomeSvg from '../../../assets/images/welcome.svg';
import LoginCard from '../../molecules/Cards/Login';
import { getLoginPageStyles } from './styles';

const LoginPage = () => {
  const theme = useTheme();
  const styles = getLoginPageStyles(theme);

  return (
    <Box component="main" sx={styles.container}>
      <Box sx={{ ...styles.leftPanel, flexDirection: 'column' }}>
        <Box sx={{ textAlign: 'center', mb: { md: 3, lg: 5 } }}>
          <Typography 
            component="h1" 
            sx={{ fontWeight: 'bold', fontSize: { md: '2.2rem', lg: '2.75rem' } }}
          >
            Bem vindo à CourseSphere
          </Typography>
          <Typography 
            component="p"
            sx={{ mt: 1, color: 'text.secondary', fontSize: { md: '1.1rem', lg: '1.25rem' } }}
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
          <LoginCard />
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;