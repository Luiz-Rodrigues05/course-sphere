import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Box, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { loginSchema } from '../../../../schemas/loginSchema';
import { useAuth } from '../../../../contexts/AuthContext';
import { login } from '../../../../services/user';
import { styles } from './styles';

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { login: setAuthUser } = useAuth();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const handleFormSubmit = async (data) => {
    setLoading(true);
    try {
      const user = await login(data.email, data.password);
      setAuthUser(user.data);
      navigate('/dashboard');
    } catch (err) {
      const errorMessage = err.message || 'Ocorreu um erro. Tente novamente.';
      enqueueSnackbar(errorMessage, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit(handleFormSubmit)}
      sx={styles.formContainer} 
      noValidate
    >
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="E-mail"
            type="email"
            variant="outlined"
            fullWidth
            required
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Senha"
            type="password"
            variant="outlined"
            fullWidth
            required
            sx={{ mt: 2 }}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        )}
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
  );
};

export default LoginForm;