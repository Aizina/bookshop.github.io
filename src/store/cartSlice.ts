import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BookCardProps, CartState } from '@/context/interfaces';

const getInitialCartItems = () => {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }
  return [];
};

const initialState: CartState = {
  cartItems: getInitialCartItems(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<BookCardProps>) {
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);
      if (!existingItem) {
        state.cartItems.push({ ...action.payload, isInCart: true, cartAmount: 1 });
        localStorage.setItem('cart', JSON.stringify(state.cartItems));
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      const item = state.cartItems.find(item => item.id === action.payload);
      if(item) {
        item.cartAmount = 0;
        item.isInCart = false;
      }
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },
    updateCart(state, action: PayloadAction<{ id: string; cartAmount: number }>) {
      const item = state.cartItems.find(item => item.id === action.payload.id);
      if (item) {
        item.cartAmount = action.payload.cartAmount;
        localStorage.setItem('cart', JSON.stringify(state.cartItems));
      }
    },
  },
});

export const { addToCart, removeFromCart, updateCart } = cartSlice.actions;
export default cartSlice.reducer;