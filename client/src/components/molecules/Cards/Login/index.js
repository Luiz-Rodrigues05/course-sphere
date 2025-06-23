import React from 'react';
import { Card } from '@mui/material';
import LoginForm from '../../Forms/Login';
import { styles } from './styles';

const LoginCard = ({ onSubmit, loading }) => {
  return (
    <Card sx={styles.card}>
      <LoginForm loading={loading} onSubmit={onSubmit} />
    </Card>
  );
};

export default LoginCard;
