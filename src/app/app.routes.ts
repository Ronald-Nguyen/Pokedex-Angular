import { RouterModule, Routes } from '@angular/router';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { FavoritesComponent } from './favorites/favorites.component';

export const routes: Routes = [
    { path: '', component: AppComponent },
    { path: 'pokemon-list', component: PokemonListComponent },
    { path: 'pokemon-detail', component: PokemonDetailComponent },
    { path: 'favorites', component: FavoritesComponent },
];

    