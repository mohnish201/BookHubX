import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  cartList!: any[];
  loading: boolean = false;
  subTotal: number = 0.00;
  shipping: number = 15.00
  total: number = 0
  cartLength: number = 0
  public skeleton = new Array(20).fill(0);

  constructor(private authService: AuthService, private favoriteService: FavoriteService, private cartService: CartService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loading = true;
    this.cartService.getCartItems().subscribe((data) => {
      this.cartList = data?.userCart?.cart_books || [];
      this.cartList.forEach(book => book.quantity = 1); // Initialize quantity for each book
      this.cartLength = this.cartList.length;
      this.calculateSubtotal();
      this.loading = false;
    });
  }

  increaseQuantity(book: any) {
    book.quantity = (book.quantity || 1) + 1;
    this.calculateSubtotal();
  }

  decreaseQuantity(book: any) {
    if (book.quantity && book.quantity > 1) {
      book.quantity -= 1;
      this.calculateSubtotal();
    }
  }

  calculateSubtotal() {
    this.subTotal = this.cartList.reduce((acc, curr) => {
      return acc + (curr.price.value * (curr.quantity || 1));
    }, 0);
  }

  removeFromCart(id: any) {
    this.cartService.removeBookFromCart(id).subscribe((data) => {
      console.log(data);
      let message = data.message;
      this.openSnackBar(message, "close");

      // Fetch updated cart items after successful deletion
      this.cartService.getCartItems().subscribe((cartData) => {
        this.cartList = cartData?.userCart?.cart_books || [];
        this.cartList.forEach(book => book.quantity = 1); // Reset quantities
        this.cartLength = this.cartList.length;
        this.calculateSubtotal();
      });
    });
  }

  openSnackBar(message: string, action: string) {
    const snackBarRef = this._snackBar.open(message, action, {
      duration: 3000,
    });

    snackBarRef.onAction().subscribe(() => {
      snackBarRef.dismiss();
    });
  }
}
