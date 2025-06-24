import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Box, Typography, Button } from '@mui/material';
import { ReactComponent as Error404Svg } from '../../../assets/images/error-404.svg';
import { getErrorPageStyles } from './styles';

const NotFound = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const styles = getErrorPageStyles(theme);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imageWrapper}>
        <Error404Svg />
      </Box>
      <Typography component="h1" sx={styles.title}>
        Página não encontrada
      </Typography>
      <Typography sx={styles.subtitle}>
        A página que você está procurando não existe ou foi movida.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={styles.button}
        onClick={() => navigate('/dashboard')}
      >
        Voltar para o Início
      </Button>
    </Box>
  );
};

export default NotFound;