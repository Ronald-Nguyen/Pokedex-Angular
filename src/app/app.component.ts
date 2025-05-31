import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { PokemonService } from './pokemon.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Pokemon } from './pokemon';
import { switchMap } from 'rxjs/operators'

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, MatInputModule, RouterLink, CommonModule, ReactiveFormsModule, MatFormFieldModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Pokedex';
  formSubmitted = false;
  currentRoute!: string;
  pokemonList$ = Observable<Pokemon[]>;


  pokemonForm = new FormGroup({
    pokemon: new FormControl(''),
  });

  public term = this.pokemonForm.value.pokemon;

  constructor(private router: Router){
    
  }
 
  
  handleSubmit() {
    this.formSubmitted = true;
    this.router.navigate(['/pokemon-list'], { queryParams: { search: this.pokemonForm.value.pokemon } });
    
  }

  onButtonClick(): void {
    this.formSubmitted = true;
  }

}
