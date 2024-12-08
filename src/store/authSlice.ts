import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, LoginError } from '@/context/interfaces';

const initialState: AuthState = {
  email: null,
  token: null,
  error: null,
  errorType: null,
  isLoggedIn: false,
  loading: false,
};

const setError = (state: AuthState, error: LoginError) => {
  state.error = error.message;
  state.errorType = error.errorType || null;
};

export const login = createAsyncThunk<
  { email: string; token: string },
  { email: string; password: string },
  { rejectValue: LoginError }
>('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      return rejectWithValue({ message: data.message, errorType: data.errorType });
    }

    return { email: credentials.email, token: data.token };
  } catch {
    return rejectWithValue({ message: 'Failed to connect to the server.', errorType: 'NetworkError' });
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.email = null;
      state.token = null;
      state.error = null;
      state.errorType = null;
      state.isLoggedIn = false;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.errorType = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<{ email: string; token: string }>) => {
        state.loading = false;
        state.email = action.payload.email;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          setError(state, action.payload);
        } else {
          setError(state, { message: 'An unknown error occurred.', errorType: 'null' });
        }
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
