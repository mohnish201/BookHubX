import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(private http: HttpClient, private authService: AuthService) {

  }

  getFavoriteItems(): Observable<any> {
    let token = ""
    this.authService.getUserData().subscribe((data) => {
      token = data?.token
    })
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    })
    return this.http.get<any>("https://bookory-api.vercel.app/favorite", { headers })
  }

  addToFavorite(patchData: any): Observable<any> {
    let token = ""
    this.authService.getUserData().subscribe((data) => {
      token = data?.token
    })
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    })
    return this.http.patch<any>("https://bookory-api.vercel.app/favorite/addBook", { book: patchData }, { headers })
  }

  removeBookFromFavorite(id: any): Observable<any> {
    let token = ""
    this.authService.getUserData().subscribe((data) => { token = data?.token })
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    })
    return this.http.delete<any>(`https://bookory-api.vercel.app/favorite/removeBook/${id}`, { headers })

  }
}
