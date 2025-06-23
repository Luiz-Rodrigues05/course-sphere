import React from 'react';
import { Card } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LoginForm from '../../Forms/Login';
import { getLoginCardStyles } from './styles';

const LoginCard = ({ onSubmit, loading }) => {
  const theme = useTheme();
  const styles = getLoginCardStyles(theme);

  return (
    <Card sx={styles.card}>
      <LoginForm loading={loading} onSubmit={onSubmit} />
    </Card>
  );
};

export default LoginCard;
