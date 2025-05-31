import { createReducer, on, createFeature } from '@ngrx/store';
import { PokemonActions, selectPokemon } from './pokemon.actions';
import { Pokemon } from '../pokemon';

export const pokemonFeatureKey = 'pokemon';

export interface State {
  pokemonList: Pokemon[];
  favoritePokemons: Pokemon[];
  selectedPokemon: Pokemon | null;
  loading: boolean;
  error: any;
}

export const initialState: State = {
  pokemonList: [],
  favoritePokemons: [],
  selectedPokemon: null,
  loading: false,
  error: null
};

const pokemonReducer = createReducer(
  initialState,
  on(PokemonActions.loadPokemons, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(PokemonActions.loadPokemonsSuccess, (state, action) => ({
    ...state,
    pokemonList: action.data,
    loading: false
  })),
  on(PokemonActions.loadPokemonsFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error
  })),

  on(PokemonActions.toggleFavorite, (state, { pokemon }) => {
    const isAlreadyFavorite = state.favoritePokemons.some(p => p.id === pokemon.id);
    const updatedFavorites = isAlreadyFavorite
      ? state.favoritePokemons.filter(p => p.id !== pokemon.id)  
      : [...state.favoritePokemons, pokemon];

    return {
      ...state,
      favoritePokemons: updatedFavorites
    };
  }),

  on(PokemonActions.loadPokemonByName, state => ({ ...state, loading: true })),
  on(PokemonActions.loadPokemonByNameSuccess, (state, { pokemon }) => ({
    ...state,
    selectedPokemon: pokemon,
    loading: false
  })),
  on(PokemonActions.loadPokemonByNameFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  on(selectPokemon, (state, { pokemon }) => ({
    ...state,
    selectedPokemon: pokemon,
  })),


);

export const pokemonFeature = createFeature({
  name: pokemonFeatureKey,
  reducer: pokemonReducer
});
