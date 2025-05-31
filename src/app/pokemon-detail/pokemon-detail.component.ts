import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { async, forkJoin, map, Observable } from 'rxjs';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { PokemonListComponent } from '../pokemon-list/pokemon-list.component';
import { Pokemon } from '../pokemon';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { PokemonActions, selectPokemon } from '../ngrx/pokemon.actions';
import { pokemonFeature } from '../ngrx/pokemon.reducer';
import { select, Store } from '@ngrx/store';
import { selectPokemonList, selectSelectedPokemon } from '../ngrx/pokemon.selectors';

@Component({
  selector: 'app-pokemon-detail',
  imports: [AsyncPipe, NgIf,  RouterModule, MatIconModule, MatButtonModule],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.css'
})
export class PokemonDetailComponent implements OnInit{
  pokemonList: any []=[]
  //pokemon: Pokemon | undefined;
  name ='';
  i = 0;
  pokemonList$!: Observable<Pokemon[]>;
  pokemon$!: Observable<Pokemon | null>;
  favoritePokemons$!: Observable<Pokemon[]>;

  constructor(
    private pokemonService: PokemonService, 
    private route: ActivatedRoute,
    private store: Store
    ){
    

    
  }


  ngOnInit(): void {
    this.pokemonService.pokemonListSub$.subscribe((data: Pokemon[]) => {
      this.pokemonList = data;
    });

    //this.pokemonList = this.getFilteredPokemonList();

    for(let i = 0; i < this.pokemonList.length; i++){
      if(this.name === this.pokemonList[i].name){
       // this.pokemon = this.pokemonList[i];
        break;
      }
        
    }
    this.route.queryParams.subscribe(params => {
      this.name = params['name'];
    })
      
    this.store.select(selectPokemonList).subscribe(pokemonList => {
      const selected = pokemonList.find(p => p.name === this.name);

      if (selected) {
        this.store.dispatch(selectPokemon({ pokemon: selected }));
      }
    });
    this.pokemon$ = this.store.select(selectSelectedPokemon);

    this.favoritePokemons$ = this.store.select(pokemonFeature.selectFavoritePokemons);
  }

    
  

  toggleLike(id: number): void{
    this.pokemonService.toggleLikePokemon(id);
  }

  isLiked(pokemon: Pokemon): boolean{
    return pokemon.liked;
  }

  getFilteredPokemonList(){
    return this.pokemonList.filter(pokemon => pokemon?.name?.includes(this.name))
  }

  toggleFavorite(pokemon: Pokemon): void {
    this.store.dispatch(PokemonActions.toggleFavorite({ pokemon }));
  }

  isFavorite(pokemon: Pokemon): Observable<boolean> {
      return this.favoritePokemons$.pipe(
        map(favorites => favorites.some(p => p.id === pokemon.id))
      );
    }
}
