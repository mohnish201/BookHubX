import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorDetailsComponent } from './components/author-details/author-details.component';
import { AuthorPageComponent } from './components/author-page/author-page.component';
import { BooksDetailPageComponent } from './components/books-detail-page/books-detail-page.component';
import { BooksPageComponent } from './components/books-page/books-page.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { FavoritePageComponent } from './components/favorite-page/favorite-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';

const routes: Routes = [
  {path:"", component:HomePageComponent},
  {path:"login", component:LoginPageComponent},
  {path:"register", component:RegisterPageComponent},
  {path:"profile", component:ProfilePageComponent},
  {path:"cart", component:CartPageComponent},
  {path:"books", component:BooksPageComponent},
  {path:"books/details/:id", component:BooksDetailPageComponent},
  {path:"favorites", component:FavoritePageComponent},
  {path:"authors", component:AuthorPageComponent},
  {path:"authors/details/:id", component:AuthorDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
