import { Component, inject, OnInit} from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { map, catchError, tap } from 'rxjs/operators';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router'
import { Pokemon } from '../pokemon';
import { RouterModule, Routes } from '@angular/router';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { Store } from '@ngrx/store';
import { PokemonActions } from '../ngrx/pokemon.actions';
import { pokemonFeature } from '../ngrx/pokemon.reducer';



@Component({
  selector: 'app-pokemon-list',
  imports: [AsyncPipe, NgFor, NgIf, RouterModule, MatGridListModule, MatIconModule, FormsModule, ReactiveFormsModule, MatCheckboxModule, MatButtonModule],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css',
})
export class PokemonListComponent implements OnInit{
  pokemonList: any[] = [];
  term = '';
  pokemonList$!: Observable<Pokemon[]>;
  favoritePokemons$!: Observable<Pokemon[]>;
  
  constructor(private pokemonService: PokemonService, private route: ActivatedRoute, private store: Store ) {
    this.route.queryParams.subscribe(params => {
      this.term = params['search'];
    });
    
    
  }

  ngOnInit(): void {
    this.pokemonService.pokemonListSub$.subscribe((data: Pokemon[]) => {
      this.pokemonList = data;
    });
    this.store.dispatch(PokemonActions.loadPokemons());
    this.pokemonList$ = this.store.select(pokemonFeature.selectPokemonList);
    this.favoritePokemons$ = this.store.select(pokemonFeature.selectFavoritePokemons);
  }

  generatePokemonList(): void {
    this.pokemonService.generatePokemonList();
  }

  isLiked(pokemon: Pokemon): boolean{
    return pokemon.liked;
  }
  
  getPokemonList(): any[] {
    console.log('pokemons: ',this.pokemonList);
    return this.pokemonList;
  }

  toggleLike(id: number): void{
    this.pokemonService.toggleLikePokemon(id);
  }

  // Methode zum Umschalten des "Lieblingsstatus"
  toggleFavorite(pokemon: Pokemon): void {
    this.store.dispatch(PokemonActions.toggleFavorite({ pokemon }));
  }

  // Methode zum Überprüfen, ob ein Pokémon in der Favoritenliste ist
  isFavorite(pokemon: Pokemon): Observable<boolean> {
    return this.favoritePokemons$.pipe(
      map(favorites => favorites.some(p => p.id === pokemon.id))
    );
  }
}


