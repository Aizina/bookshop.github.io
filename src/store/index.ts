// store/index.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import booksReducer from './bookSlice';
import cartReducer from './cartSlice';
import authReducer from './authSlice'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root', 
	  storage,
}


// const store = configureStore({
//   reducer: {
//     books: booksReducer,
//     cart: cartReducer,
//     auth: authReducer,
//   },
// });

const rootReducer = combineReducers({
  books: booksReducer,
  cart: cartReducer,
  auth: authReducer,
});



const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export default store;