import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom, isDevMode } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideState, provideStore, StoreModule } from '@ngrx/store';
import { provideStoreDevtools, StoreDevtoolsModule } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { reducers, metaReducers } from './reducers';
import { PokemonEffects } from './ngrx/pokemon.effects';
import { pokemonFeature } from './ngrx/pokemon.reducer';




export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), 
              provideHttpClient(withFetch()),
             provideStore(reducers, {metaReducers}), provideEffects(PokemonEffects), provideState(pokemonFeature),
             provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),]
};
