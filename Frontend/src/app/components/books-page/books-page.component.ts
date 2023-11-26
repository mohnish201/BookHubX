import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { loadBooks } from '../../ngrx-stores/book-store/book.action';
import { BooksI } from '../../ngrx-stores/book-store/book.model';
import { bookAppState } from '../../ngrx-stores/book-store/book.reducer';
import { bookList } from '../../ngrx-stores/book-store/book.selector';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-books-page',
  templateUrl: './books-page.component.html',
  styleUrl: './books-page.component.css'
})
export class BooksPageComponent implements OnInit, OnDestroy {

  loading!:boolean;
  bookList:BooksI[]=[];
  bookSubscribe!:Subscription
  cartColor:String="none"
  favoriteColor:String="black"

  ngOnInit():void{
    this.store.dispatch(loadBooks());
    this.bookSubscribe = this.store.select(bookList).subscribe((data)=>{
      this.bookList = data
    })

  }

  ngOnDestroy(): void {
    if(this.bookSubscribe){
      this.bookSubscribe.unsubscribe()
    }
  }

   toggleCart(){
     this.cartColor= "orange"
   }


   toggleFavorite(){
    this.favoriteColor= "red"
   }

  constructor(private bookService: BookService, private store: Store<{ bookReducer: bookAppState }>) { }


}
