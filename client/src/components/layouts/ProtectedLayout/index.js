import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Header from '../../organisms/Header';
import { getProtectedLayoutStyles } from './styles';

const ProtectedLayout = () => {
  const theme = useTheme();
  const styles = getProtectedLayoutStyles(theme);

  return (
    <Box sx={styles.layoutContainer}>
      <Header />
      <Box 
        component="main" 
        sx={styles.mainContent}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default ProtectedLayout;