import { createSlice } from '@reduxjs/toolkit'
import { ProductState } from '../../interfaces/product/product.interfaces';

const initialState: ProductState = {
  products: [],
  product: {
    id: '',
    name: '',
    description: '',
    price: '0.00',
    stock: 0,
    category: '',
    imageUrl: '',
    isActive: false,
    createdAt: '',
    updatedAt: ''
  }
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.products = action.payload;
    },
    setProductDetails: (state, action) => {
      state.product = action.payload;
    },
  },
});

export const {
  setProduct,
  setProductDetails
} = productSlice.actions;