import { configureStore } from '@reduxjs/toolkit';
import pokedexSlice from '../features/pokedexSlice';
import pokemonSlice from '../features/pokemonSlice';

export const store = configureStore({
  reducer: {
    pokedex: pokedexSlice,
    pokemon: pokemonSlice
  },
})
