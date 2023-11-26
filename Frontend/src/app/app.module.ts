import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './components/home-page/home-page.component';
import { BooksPageComponent } from './components/books-page/books-page.component';
import { BooksDetailPageComponent } from './components/books-detail-page/books-detail-page.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { FavoritePageComponent } from './components/favorite-page/favorite-page.component';
import { CheckoutPageComponent } from './components/checkout-page/checkout-page.component';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { BooksEffects } from './ngrx-stores/book-store/book.effect';
import { StoreModule } from '@ngrx/store';
import { bookReducer } from './ngrx-stores/book-store/book.reducer';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { NgFor } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    BooksPageComponent,
    BooksDetailPageComponent,
    ProfilePageComponent,
    CartPageComponent,
    FavoritePageComponent,
    CheckoutPageComponent,
    NavbarComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({ bookReducer: bookReducer }),
    EffectsModule.forRoot([BooksEffects]),
    MatIconModule, MatInputModule, MatFormFieldModule, NgFor
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
