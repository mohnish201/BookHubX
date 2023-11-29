import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  constructor(private authService: AuthService, private favoriteService: FavoriteService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loading = true
    this.favoriteService.getFavoriteItems().subscribe((data) => {
      this.favoriteList = data?.userFavorites?.favorite_books  || []
      console.log(data)
      this.loading=false
    })
  }

  addToCart(){

  }

  removeFromFavorite(id:any){
    this.favoriteService.removeBookFromFavorite(id).subscribe((data)=> {
        console.log(data)
        let message = data.message
        this.openSnackBar(message, "close")

         // Fetch updated favorite items after successful deletion
      this.favoriteService.getFavoriteItems().subscribe((data) => {
        this.favoriteList = data?.userFavorites?.favorite_books || [];
      });
    })
  }

  openSnackBar(message: string, action: string) {
    const snackBarRef = this._snackBar.open(message, action, {
      duration: 3000, // Adjust the duration as needed
    });

    snackBarRef.onAction().subscribe(() => {
      // Handle action here if needed
      snackBarRef.dismiss(); // Dismiss the snack bar on action (if desired)
    });
  }

}
