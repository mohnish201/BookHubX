import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { query } from '../ngrx-stores/book-store/book.action';
import { BooksI } from '../ngrx-stores/book-store/book.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient, private authService:AuthService) { }

  getbookData(q: query): Observable<BooksI[]> {
    return this.http.get<BooksI[]>(`http://localhost:4800/books?q=${q.searchText}&authorName=${q.authorName}&bookTitle=${q.bookTitle}&category=${q.category}`)
  }

  getbookDataById(id:any):Observable<BooksI[]>{
    let token = ""
    this.authService.getUserData().subscribe((data) =>{ token = data?.token
    } )
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    })
   return this.http.get<BooksI[]>(`http://localhost:4800/books/${id}`, {headers})
  }




}

