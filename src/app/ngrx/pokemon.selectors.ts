import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './pokemon.reducer';

export const selectPokemonState = createFeatureSelector<State>('pokemon');

export const selectPokemonList = createSelector(
  selectPokemonState,
  (state) => state.pokemonList
);

export const selectSelectedPokemon = createSelector(
  selectPokemonState,
  (state) => state.selectedPokemon
);

export const selectFavoritePokemons = createSelector(
  selectPokemonList,
  pokemons => pokemons.filter(p => p.liked)
);
