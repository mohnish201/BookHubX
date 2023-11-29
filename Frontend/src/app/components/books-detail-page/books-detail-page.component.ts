import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';
import { CartService } from '../../services/cart.service';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-books-detail-page',
  templateUrl: './books-detail-page.component.html',
  styleUrl: './books-detail-page.component.css'
})
export class BooksDetailPageComponent {

  bookData: any = []
  constructor(private route: ActivatedRoute, private _snackBar: MatSnackBar, private bookService: BookService, private favoriteService: FavoriteService, private cartService: CartService) {

    this.route.params.subscribe((params) => {
      const book_id = params['id'];
      this.bookService.getbookDataById(book_id).subscribe((data) => this.bookData = data[0])

    })
  }

  addToCart(book: any) {
    this.cartService.addToCart(book).subscribe((data) => {
      let message = data?.message.toString()
      this.openSnackBar(message, "close")
    })
  }

  addToFavorite(book: any) {
    this.favoriteService.addToFavorite(book).subscribe((data) =>{
      let message = data?.message.toString()
      this.openSnackBar(message, "close")
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
