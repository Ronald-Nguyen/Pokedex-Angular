import { createAction, props } from '@ngrx/store';
import { Pokemon } from '../pokemon';

export const PokemonActions = {
  loadPokemons: createAction('[Pokemon] Load Pokemons'),
  loadPokemonsSuccess: createAction('[Pokemon] Load Pokemons Success', props<{ data: Pokemon[] }>()),
  loadPokemonsFailure: createAction('[Pokemon] Load Pokemons Failure', props<{ error: any }>()),
  
  loadPokemonByName: createAction('[Pokemon] Load Pokemon By Name', props<{ name: string }>()),
  loadPokemonByNameSuccess: createAction('[Pokemon] Load Pokemon By Name Success', props<{ pokemon: Pokemon }>()),
  loadPokemonByNameFailure: createAction('[Pokemon] Load Pokemon By Name Failure', props<{ error: any }>()),

  toggleFavorite: createAction(
    '[Pokemon] Toggle Favorite',
    props<{ pokemon: Pokemon }>()
  ),
};

export const selectPokemon = createAction(
  '[Pokemon] Select Pokemon',
  props<{ pokemon: Pokemon }>()
);