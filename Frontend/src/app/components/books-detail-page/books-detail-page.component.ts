import { Component } from '@angular/core';
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

  bookData:any=[]
  constructor(private route: ActivatedRoute, private bookService:BookService,private favoriteService:FavoriteService, private cartService:CartService){

    this.route.params.subscribe((params)=> {
      const book_id = params['id'];
       this.bookService.getbookDataById(book_id).subscribe((data) => this.bookData = data[0])

    })
  }

  addToCart(book:any){
    this.cartService.addToCart(book).subscribe((data)=> console.log(data))
  }

  addToFavorite(book:any){
    this.favoriteService.addToFavorite(book).subscribe((data) => console.log(data))
  }

}
