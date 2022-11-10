import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  pokemonList: [],
  loading: false,
  error: false,
  currentUrl: 'https://pokeapi.co/api/v2/pokemon?limit=10',
  previousUrl: null,
  nextUrl: null,
  page: 1
};

export const fetchPokedex = createAsyncThunk(
  'pokedex/fetchPokedex',
  async({ url, pageNumber }, { getState }) => {
    const state = getState();
    const response = await axios.get(url || state.pokedex.currentUrl);
    return {
      ...response.data,
      page: pageNumber ? state.pokedex.page + pageNumber : 1
    };
  }
);

const pokedexSlice = createSlice({
  name: 'pokedex',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPokedex.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPokedex.fulfilled, (state, action) => {
      state.pokemonList = action.payload.results;
      state.page = action.payload.page;
      state.previousUrl = action.payload.previous;
      state.nextUrl = action.payload.next;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(fetchPokedex.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  }
});

export default pokedexSlice.reducer;
