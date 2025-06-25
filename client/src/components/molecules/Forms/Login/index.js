import React, { useState } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styles } from './styles';

const LoginForm = ({ onSubmit, loading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
      onSubmit({ email, password });
  };

  return (
    <>
      <Typography variant="h5" component="h1" sx={styles.title}> Login </Typography>
      <Box 
        component="form" 
        onSubmit={handleSubmit} 
        sx={styles.formContainer} 
        noValidate
      >
        <TextField
          label="E-mail"
          type="email"
          name="email"
          variant="outlined"
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Senha"
          type="password"
          name="password"
          variant="outlined"
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <LoadingButton
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          loading={loading}
          sx={styles.submitButton}
        >
          <Typography>Entrar</Typography>
        </LoadingButton>
      </Box>
    </>
  );
};

export default LoginForm;