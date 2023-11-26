import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { BooksI } from '../ngrx-stores/book-store/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getbookData(): Observable<BooksI[]> {
    return this.http.get<BooksI[]>("http://localhost:4800/books")
  }
}
