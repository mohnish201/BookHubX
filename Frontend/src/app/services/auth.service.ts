import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthSubject: BehaviorSubject<boolean>
  private userDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { 
    const storedIsAuth = localStorage.getItem('isAuth');
    const initialIsAuth = storedIsAuth ? JSON.parse(storedIsAuth) : false;
    this.isAuthSubject = new BehaviorSubject<boolean>(initialIsAuth);
  }

  login(loginData: any): Observable<any> {
    return this.http.post<any>("http://localhost:4800/auth/login", loginData)
  }

  changeIsAuth(isAuth: boolean): void {
    this.isAuthSubject.next(isAuth);
  }

  updateUserData(userData: any): void {
    this.userDataSubject.next(userData);
  }

  getIsAuth(): Observable<boolean> {
    return this.isAuthSubject.asObservable();
  }

  getUserData(): Observable<any> {
    return this.userDataSubject.asObservable();
  }
}
