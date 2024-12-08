// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './bookSlice';
import cartReducer from './cartSlice';
import authReducer from './authSlice'

const store = configureStore({
  reducer: {
    books: booksReducer,
    cart: cartReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;