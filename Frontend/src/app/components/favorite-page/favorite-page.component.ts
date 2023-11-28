import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-favorite-page',
  templateUrl: './favorite-page.component.html',
  styleUrl: './favorite-page.component.css'
})
export class FavoritePageComponent {

  favoriteList!:any
  loading: boolean = false
  public skeleton = new Array(20).fill(0);

  constructor(private authService: AuthService, private favoriteService: FavoriteService) { }

  ngOnInit(): void {
    this.loading = true
    this.favoriteService.getFavoriteItems().subscribe((data) => {
      this.favoriteList = data?.userFavorites?.favorite_books  || []
      console.log(data)
      this.loading=false
    })
  }

}
