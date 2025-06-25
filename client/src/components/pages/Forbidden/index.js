import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Box, Typography, Button } from '@mui/material';
import { ReactComponent as Error403Svg } from '../../../assets/images/error-403.svg';
import { getErrorPageStyles } from './styles';

const Forbidden = () => {
  const theme = useTheme();
  const styles = getErrorPageStyles(theme);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imageWrapper}>
        <Error403Svg />
      </Box>
      <Typography component="h1" sx={styles.title}>
        Acesso Negado
      </Typography>
      <Typography sx={styles.subtitle}>
        Você não tem as permissões necessárias para ver esta página. Fale com um administrador.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={styles.button}
        component={RouterLink}
        to="/dashboard"
      >
        Voltar para o início
      </Button>
    </Box>
  );
};

export default Forbidden;