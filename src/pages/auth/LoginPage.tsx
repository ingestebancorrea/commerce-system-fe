import { useEffect, useState } from 'react';
import { useForm, Controller, FieldValues } from "react-hook-form";
import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, TextField, Typography, IconButton, Link } from "@mui/material";
import { useDispatch } from 'react-redux';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { useAxiosPost } from "../../hooks/usePostAxios";
import { login } from '../../store/auth/authSlice';
import { Loader } from '../../components/app/Loader';
import { AuthLayout } from '../../layout/auth/AuthLayout';
import { LoginResponse } from '../../interfaces/auth/auth.interfaces';

export const LoginPage = () => {
  const url = `${import.meta.env.VITE_API_URL}/auth/login`;
  const dispatch = useDispatch();
  const { control, handleSubmit, formState: { errors } } = useForm();
  const { postData, isLoading, data: response } = useAxiosPost<LoginResponse>();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: FieldValues) => {
    const { username, password } = data;
    await postData(url, { username, password });
  };

  useEffect(() => {
    if (response) {
      const {
        token,
        user: { id, email, name, role }
      } = response;
      dispatch(login({ id, email, name, role, token }));
      localStorage.setItem('token', token);
    }
  }, [dispatch, response]);
  
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  if (isLoading) {
    return <Loader/>;
  }

  return (
    <AuthLayout title="Welcome">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Controller
              name="username"
              control={control}
              defaultValue=""
              rules={{
                required: 'Username es requerido',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Correo no es válido',
                }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Username"
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
              sx={{
                bgcolor: "#FD5149",
                width: "280px",
              }}
            >
              Login
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

          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/role">
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};