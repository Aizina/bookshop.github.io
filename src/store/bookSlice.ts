import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { BookProps, BooksState } from '@/context/interfaces';


const initialState: BooksState = {
    books: [],
    currentCategory: 'Architecture',
    maxResults: 12,
    error: null,
    loading: false,
  };

export const fetchBooks = createAsyncThunk(
    'books/fetchBooks',
    async ({ category, maxResults }: { category: string; maxResults: number }, { rejectWithValue }) => {
      try {
        const response = await fetch(`/api/fetchBooks?subject=${category}&maxResults=${maxResults}`);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch books');
        }
        return data.data; // Books array
      } catch (error: unknown) {
        if (error instanceof Error) {
          return rejectWithValue(error.message || 'Error fetching books');
        }
        return rejectWithValue('Error fetching books');
      }
    }
  );
  
  const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
      setCategory(state, action: PayloadAction<string>) {
        state.currentCategory = action.payload;
      },
      loadMoreBooks(state) {
        state.maxResults += 6;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchBooks.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<BookProps[]>) => {
          state.loading = false;
          state.books = action.payload;
        })
        .addCase(fetchBooks.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload ? (action.payload as string) : 'Failed to fetch books';
        });
        
    },
  });
  

export const { setCategory, loadMoreBooks } = booksSlice.actions;
export default booksSlice.reducer;
