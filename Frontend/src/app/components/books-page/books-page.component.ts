import { Component, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { loadBooks, query } from '../../ngrx-stores/book-store/book.action';
import { BooksI } from '../../ngrx-stores/book-store/book.model';
import { bookAppState } from '../../ngrx-stores/book-store/book.reducer';
import { bookList, loading } from '../../ngrx-stores/book-store/book.selector';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-books-page',
  templateUrl: './books-page.component.html',
  styleUrl: './books-page.component.css'
})
export class BooksPageComponent implements OnInit, OnDestroy {

  bookList: BooksI[] = [];
  loading: boolean = false
  bookSubscribe!: Subscription
  cartColor: String = "none"
  favoriteColor: String = "black"
  searchText: String = ""
  category: String = ""
  bookTitle: String = ""
  authorName: String = ""
  selectedCategories: string[] = [];
  categories: string[] = ['Mystery', 'Drama', 'Fiction', 'Comedy', 'Fantasy', 'Thriller'];
  authors: string[] = [
    "Khaled Hosseini",
    "Dan Brown",
    "Sophie Kinsella",
    "John Irving",
    "Nicholas Sparks",
    "Maeve Binchy",
    "David Baldacci",
    "Terry Brooks",
    "Linda van Rijn"
  ]

  selectedCategory: string = '';
  selectedAuthor:string="";
  public skeleton = new Array(20).fill(0);



  ngOnInit(): void {
    this.fetchBookData()
    // this.store.dispatch(loadBooks());
    // this.bookSubscribe = this.store.select(bookList).subscribe((data) => {
    //   this.bookList = data
    // })
    


  }
  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['selectedCategory'] && !changes['selectedCategory'].firstChange) || (changes['selectedAuthor'] && !changes['selectedAuthor'].firstChange) || changes['searchText']) {
      this.fetchBookData();
    }


  }

  clearSearch() {
    this.searchText = '';
    this.fetchBookData(); // Fetch all books
  }
  public fetchBookData() {
    const query: any = {
      searchText: this.searchText,
      category: this.selectedCategory,
      bookTitle: this.bookTitle,
      authorName: this.selectedAuthor
    };
     
    // this.store.dispatch(loadBooks())
    this.loading = true
    this.bookService.getbookData(query).subscribe((data) => {
      console.log(data);
      this.bookList = data;
      this.loading = false
    });
   

    // this.store.select(loading).subscribe((data) => this.loading = data)
  }


  ngOnDestroy(): void {
    if (this.bookSubscribe) {
      this.bookSubscribe.unsubscribe()
    }

  }

  selectCategory(category: string) {
    this.selectedCategory = category;

   
    
    console.log(this.selectedCategory)
    this.fetchBookData()
  }

  selectAuthor(author:string){
    
    this.selectedAuthor = author;

    
    console.log(this.selectedAuthor)
    this.fetchBookData()
  }

  toggleCart() {
    this.cartColor = "orange"
  }


  toggleFavorite() {
    this.favoriteColor = "red"
  }

  constructor(private bookService: BookService, private store: Store<{ bookReducer: bookAppState }>) { }


}
