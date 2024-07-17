import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class CartService {


  constructor(private http: HttpClient, private authService: AuthService) {

  }

  getCartItems(): Observable<any> {
    let token = ""
    this.authService.getUserData().subscribe((data) => {
      token = data?.token
    })
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    })
    return this.http.get<any>("https://bookory-api.vercel.app/cart", { headers })
  }

  addToCart(patchData: any): Observable<any> {
    let token = ""
    this.authService.getUserData().subscribe((data) => {
      token = data?.token
    })
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    })
    return this.http.patch<any>("https://bookory-api.vercel.app/cart/addBook", { book: patchData }, { headers })
  }


  removeBookFromCart(id: any): Observable<any> {
    let token = ""
    this.authService.getUserData().subscribe((data) => { token = data?.token })
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    })
    return this.http.delete<any>(`https://bookory-api.vercel.app/cart/removeBook/${id}`, { headers })

  }
}
