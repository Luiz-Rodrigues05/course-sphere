import React from 'react';
import { AppBar, Toolbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Navbar from '../../molecules/Navbar';
import { getHeaderStyles } from './styles';

const Header = () => {
  const theme = useTheme();
  const styles = getHeaderStyles(theme);

  return (
    <AppBar 
      position="static" 
      sx={styles.appBar} 
      elevation={1}
    >
      <Toolbar>
        <Navbar />
      </Toolbar>
    </AppBar>
  );
};

export default Header;