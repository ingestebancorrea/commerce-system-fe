import { configureStore } from '@reduxjs/toolkit';
import { productSlice } from './product/productSlice';
import { authSlice } from './auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    product: productSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;