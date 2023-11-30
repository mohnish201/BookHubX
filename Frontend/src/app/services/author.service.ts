import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http:HttpClient, private authService:AuthService) { }

  getAuthors():Observable<any>{
    let token = ""
    this.authService.getUserData().subscribe((data) => {token = data?.token})
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    })
    return this.http.get<any>(`http://localhost:4800/authors`, {headers})
  }

  getAuthorById(author_id:any):Observable<any>{
    let token = ""
    this.authService.getUserData().subscribe((data) => {token = data?.token})
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    })
    return this.http.get<any>(`http://localhost:4800/authors/${author_id}`, {headers})
  }


}
