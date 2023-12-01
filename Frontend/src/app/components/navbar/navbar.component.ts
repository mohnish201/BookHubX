import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  public isAuth!: boolean
  public cartLength: number=0
  public favoriteLength: number=0
  public username: string = 'Username'
  constructor(private authService: AuthService, private favoriteService: FavoriteService, private cartService: CartService, private router: Router, private _snackBar: MatSnackBar) {
    this.authService.getIsAuth().subscribe((data) => this.isAuth = data)
    this.authService.getUserData().subscribe((data) => this.username = data?.username)
    this.cartService.getCartItems().subscribe((data) => this.cartLength = data?.userCart?.cart_books.length)
    this.favoriteService.getFavoriteItems().subscribe((data) => this.favoriteLength = data?.userFavorites?.favorite_books.length)
    // console.log(this.cartLength, this.favoriteLength)
  }

  ngOnInit(): void {
    this.cartService.getCartItems().pipe(
      tap((data) => this.cartLength = data?.userCart?.cart_books.length)
    ).subscribe();
    
    this.favoriteService.getFavoriteItems().pipe(
      tap((data) => this.favoriteLength = data?.userFavorites?.favorite_books.length)
    ).subscribe();
    console.log(this.cartLength, this.favoriteLength)
  }


  logout() {
    this.authService.changeIsAuth(false)
    localStorage.setItem("isAuth", JSON.stringify(false))
    localStorage.removeItem("isAuth")
    localStorage.removeItem("userData")
    this.openSnackBar("You are logged out", "close")
    this.router.navigate(['/'])
    // window.location.reload()
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
