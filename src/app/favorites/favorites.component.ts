import { Component, NgModule, OnInit } from '@angular/core';
import { PokemonListComponent } from '../pokemon-list/pokemon-list.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { NgModel } from '@angular/forms';
import { Pokemon } from '../pokemon';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PokemonActions } from '../ngrx/pokemon.actions';
import { pokemonFeature } from '../ngrx/pokemon.reducer';


@Component({
  selector: 'app-favorites',
  imports: [ NgFor, RouterModule, MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
})
export class FavoritesComponent implements OnInit {
  pokemonList: any[] = [];
  favoritePokemons$!: Observable<Pokemon[]>;

  term = '';

  constructor(private pokemonService: PokemonService, private route: ActivatedRoute, private store: Store) {
    

    }
  
    ngOnInit(): void {
      this.pokemonService.pokemonListSub$.subscribe((data: Pokemon[]) => {
        this.pokemonList = data;
      });
      console.log('favs: ', this.pokemonList);
     this.store.dispatch(PokemonActions.loadPokemons());
     this.favoritePokemons$ = this.store.select(pokemonFeature.selectFavoritePokemons);

    }
    generatePokemonList(): void {
      this.pokemonService.generatePokemonList();
    }
    likePokemon(pokemon: Pokemon) {
      pokemon.liked = true;
    }
  
    dislikePokemon(pokemon: Pokemon) {
      pokemon.liked = false;
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
}
