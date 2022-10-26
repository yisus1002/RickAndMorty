import { CharacterDetalleComponent } from './pages/character-detalle/character-detalle.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CharactersComponent } from './pages/characters/characters.component';
import { EpisodesComponent } from './pages/episodes/episodes.component';
import { CharacterComponent } from './shared/character/character.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterComponent } from './shared/filter/filter.component';


import { HttpClientModule} from "@angular/common/http"
import { GraphQLModule } from './graphql.module';


//Pagination module
import { NgxPaginationModule } from 'ngx-pagination';
import { LoadingComponent } from './shared/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    CharactersComponent,
    EpisodesComponent,
    CharacterComponent,
    FilterComponent,
    LoadingComponent,
    CharacterDetalleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    GraphQLModule,
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
