import React from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { Box, Typography } from '@mui/material'; // Container foi removido
import { useTheme } from '@mui/material/styles';
import CourseList from "../../organisms/CoursesList";
import { getDashboardStyles } from './styles';

const Dashboard = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const styles = getDashboardStyles(theme);

  return (
    <Box sx={styles.root}>
      <Typography 
        variant="h4" 
        component="h1"
        sx={styles.welcomeMessage}
      >
        Bem-vindo(a), {user?.name}!
      </Typography>
      <CourseList />
    </Box>
  );
};

export default Dashboard;