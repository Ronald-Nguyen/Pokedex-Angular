import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, forkJoin } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Pokemon } from './pokemon';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  pokemonList: Pokemon[] = [];
  private pokemonListSubject = new BehaviorSubject<Pokemon[]>([]);
  public pokemonListSub$ = this.pokemonListSubject.asObservable();

 

  constructor(private http: HttpClient) { 
    this.generatePokemonList();
  }
  
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon';
  


 getPokemonList(limit: number = 2000): Observable<Pokemon[]> {
  return this.http.get(`${this.baseUrl}?limit=${limit}`).pipe(
    map((data: any) => data.results)
  );
  }

  getPokemonDetails(url: string): Observable<any> {
    return this.http.get(url);
  }

  generatePokemonList(): void {
    this.getPokemonList().subscribe((pokemon: any[]) => {
      const requests = pokemon.map(p => this.getPokemonDetails(p.url));
      forkJoin(requests).subscribe((details: any[]) => {
        this.pokemonList = details.map((detail, index) => ({
          id: index,
          name: detail.name,
          sprite_front: detail.sprites.front_default,
          sprite_back: detail.sprites.back_default,
          weight: detail.weight,
          base_experience: detail.base_experience,
          height: detail.height,
          abilities: detail.abilities.map((a: any) => a.ability.name),
          liked: false
        }));
       // console.log(this.pokemonList);
        this.pokemonListSubject.next(this.pokemonList);
      });
    });
  }

  toggleLikePokemon(id: number): void {
    const index = this.pokemonList.findIndex(pokemon => pokemon.id === id);
    if (index !== -1) {
      this.pokemonList[index].liked = !this.pokemonList[index].liked;
      this.pokemonListSubject.next(this.pokemonList); // Update the BehaviorSubject
    }
  }
  
}
  