import { useEffect, useState } from 'react';
import { useForm, Controller, FieldValues } from 'react-hook-form';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, Grid, TextField, Typography, IconButton, Link } from '@mui/material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { useAxiosPost } from '../../hooks/usePostAxios';
import { Loader } from '../../components/app/Loader';
import { login } from '../../store/auth/authSlice';
import { AuthLayout } from '../../layout/auth/AuthLayout';
import { LoginResponse } from '../../interfaces/auth/auth.interfaces';

export const RegisterPage = () => {
  const url = `${import.meta.env.VITE_API_URL}/auth/signup`;
  const dispatch = useDispatch();
  const { control, handleSubmit, formState: { errors } } = useForm();
  const { postData, isLoading, data: response } = useAxiosPost<LoginResponse>();
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const role = queryParams.get('role');

  const onSubmit = async (data: FieldValues) => {
    const { name, username, password } = data;
    await postData(url, { name, username, password, role });
  };

  useEffect(() => {
    if (response) {
      const {
        token,
        user: { id, email, name, role }
      } = response;
      dispatch(login({ id, email, name, token, role }));
      localStorage.setItem('token', token);
    }
  }, [dispatch, response]);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <AuthLayout title='Crear Cuenta'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{ required: 'Nombre completo es requerido' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nombre completo"
                  type="text"
                  placeholder="Nombre completo"
                  fullWidth
                  sx={{ width: '280px' }}
                  error={!!errors.name}
                  helperText={typeof errors.name?.message === 'string' ? errors.name?.message : ''}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <Controller
              name="username"
              control={control}
              defaultValue=""
              rules={{ required: 'Username es requerido', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Correo no es válido' } }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Correo"
                  type="email"
                  placeholder="correo@gmail.com"
                  fullWidth
                  sx={{ width: '280px' }}
                  error={!!errors.username}
                  helperText={typeof errors.username?.message === 'string' ? errors.username?.message : ''}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: 'Contraseña es requerida', minLength: { value: 6, message: 'La contraseña debe tener al menos 6 caracteres' } }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Contraseña"
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  fullWidth
                  sx={{ width: '280px' }}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
                  }}
                  error={!!errors.password}
                  helperText={typeof errors.password?.message === 'string' ? errors.password?.message : ''}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ bgcolor: '#FD5149', width: '280px' }}
            >
              Crear cuenta
            </Button>
          </Grid>

          <Grid
            container
            direction="column"
            spacing={1}
            sx={{ mb: 2, mt: 1, minWidth: '10px', maxWidth: '300px' }}
          >
            <Grid item>
              <Typography sx={{ textAlign: 'center' }}>OR</Typography>
            </Grid>

          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color='inherit' to='/auth/login'>
              Ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
}