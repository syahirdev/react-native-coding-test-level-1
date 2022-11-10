import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  data: null,
  species: null,
  loading: false,
  error: false
};

export const fetchPokemon = createAsyncThunk(
  'pokemon/fetchPokemon',
  async({ pokemonName }) => {
    const dataResponse = await axios.get('https://pokeapi.co/api/v2/pokemon/' + pokemonName);
    const speciesResponse = await axios.get('https://pokeapi.co/api/v2/pokemon-species/' + pokemonName);
    return {
      data: dataResponse.data,
      species: speciesResponse.data
    };
  }
);

const pokemonSlice = createSlice({
  name: 'pokedex',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPokemon.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPokemon.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.species = action.payload.species;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(fetchPokemon.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  }
});

export default pokemonSlice.reducer;
