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
    return this.http.get(`http://localhost:4800/reviews/${book_id}`, { headers })
  }

  postReview(book_id: any, body: any): Observable<any> {
    let token = ""
    this.authService.getUserData().subscribe((data) => { token = data?.token })
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    })

    return this.http.patch<any>(`http://localhost:4800/reviews/addReview/${book_id}`, body, { headers })
  }

  getDiscussions(book_id: any): Observable<any> {
    let token = ""
    this.authService.getUserData().subscribe((data) => { token = data?.token })
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    })

    return this.http.get<any>(`http://localhost:4800/discussion/${book_id}`, { headers })
  }


  postDiscussion(book_id: any, body: any): Observable<any> {
    let token = ""
    this.authService.getUserData().subscribe((data) => { token = data?.token })
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    })

    return this.http.patch<any>(`http://localhost:4800/discussion/addComment/${book_id}`, body, {headers})
  }

}
