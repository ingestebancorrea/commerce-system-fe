import { createSlice } from '@reduxjs/toolkit';
import { AuthState } from '../../interfaces/auth/auth.interfaces';

const initialState: AuthState = {
  status: 'not-authenticated',
  id: null,
  name: null,
  token: null,
  rol: null,
  errorMessage: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.status = 'authenticated';
      state.id = payload.id;
      state.name = payload.name;
      state.token = payload.token;
      state.rol = payload.role;
      state.errorMessage = null;
    },
    logout: (state, { payload }) => {
      state.status = 'not-authenticated';
      state.id = null;
      state.name = null;
      state.token = null;
      state.rol = null;
      state.errorMessage = payload?.errorMessage ?? null;
    },
    checkingCredentials: (state) => {
      state.status = 'checking';
    },
    revalidateToken: (state, { payload }) => {
      state.status = 'authenticated';
      state.id = payload.id;
      state.name = payload.name;
      state.token = payload.token;
      state.rol = payload.rol;
      state.errorMessage = null;
    }
  },
});

export const { login, logout, checkingCredentials, revalidateToken } = authSlice.actions;
