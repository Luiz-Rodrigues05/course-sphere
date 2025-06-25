import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Box, Typography, Button } from '@mui/material';
import { ReactComponent as Error401Svg } from '../../../assets/images/error-401.svg';
import { getErrorPageStyles } from './styles';

const Unauthorized = () => {
  const theme = useTheme();
  const styles = getErrorPageStyles(theme);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imageWrapper}>
        <Error401Svg />
      </Box>
      <Typography component="h1" sx={styles.title}>
        Autenticação Necessária
      </Typography>
      <Typography sx={styles.subtitle}>
        Você precisa fazer login para acessar esta página.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={styles.button}
        component={RouterLink}
        to="/login"
      >
        Ir para Login
      </Button>
    </Box>
  );
};

export default Unauthorized;