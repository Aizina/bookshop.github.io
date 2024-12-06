// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './bookSlice';

// Create the Redux store
const store = configureStore({
  reducer: {
    books: booksReducer,
  },
});

// Define RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;