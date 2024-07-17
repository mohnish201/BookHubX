import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewDiscussionService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getReviews(book_id: any): Observable<any> {
    let token = ""
    this.authService.getUserData().subscribe((data) => { token = data?.token })
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    })
    return this.http.get(`https://bookory-api.vercel.app/reviews/${book_id}`, { headers })
  }

  postReview(book_id: any, body: any): Observable<any> {
    let token = ""
    this.authService.getUserData().subscribe((data) => { token = data?.token })
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    })

    return this.http.patch<any>(`https://bookory-api.vercel.app/reviews/addReview/${book_id}`, body, { headers })
  }

  getDiscussions(book_id: any): Observable<any> {
    let token = ""
    this.authService.getUserData().subscribe((data) => { token = data?.token })
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    })

    return this.http.get<any>(`https://bookory-api.vercel.app/discussion/${book_id}`, { headers })
  }


  postDiscussion(book_id: any, body: any): Observable<any> {
    let token = ""
    this.authService.getUserData().subscribe((data) => { token = data?.token })
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    })

    return this.http.patch<any>(`https://bookory-api.vercel.app/discussion/addComment/${book_id}`, body, { headers })
  }

}
