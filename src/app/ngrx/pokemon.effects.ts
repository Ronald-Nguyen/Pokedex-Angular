import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { PokemonActions } from './pokemon.actions';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Pokemon } from '../pokemon';

@Injectable()
export class PokemonEffects {
  loadPokemonList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.loadPokemons),
      switchMap(() =>
        this.pokemonService.pokemonListSub$.pipe(
          map(pokemonList => PokemonActions.loadPokemonsSuccess({ data: pokemonList })),
          catchError(error => of(PokemonActions.loadPokemonsFailure({ error })))
        )
      )
    )
  );
  
  constructor(private actions$: Actions, private pokemonService: PokemonService) {}
}
