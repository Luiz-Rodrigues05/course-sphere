import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { Box, Typography, Button, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IoSchoolSharp, IoHome, IoLogOutOutline } from 'react-icons/io5';
import { getNavbarStyles } from './styles';

const Navbar = () => {
  const { logout } = useAuth();
  const theme = useTheme();
  const styles = getNavbarStyles(theme);

  return (
    <Box component="nav" sx={styles.navbar}>
      <Link component={RouterLink} to="/dashboard" sx={styles.logoLink}>
        <IoSchoolSharp style={styles.logoIcon} />
        <Typography variant="h6" component="h1" sx={styles.logoText}>
          CourseSphere
        </Typography>
      </Link>

      <Box sx={styles.navLinks}>
        <Button
          component={RouterLink}
          to="/dashboard"
          color="inherit"
          startIcon={<IoHome />}
        >
          Home
        </Button>
        <Button
          color="inherit"
          onClick={logout}
          startIcon={<IoLogOutOutline />}
        >
          Sair
        </Button>
      </Box>
    </Box>
  );
};

export default Navbar;