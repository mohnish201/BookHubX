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

    const storedUserData = localStorage.getItem('userData');
    const initialUserData = storedUserData ? JSON.parse(storedUserData) : null;
    this.userDataSubject = new BehaviorSubject<any>(initialUserData);
  }

  login(loginData: any): Observable<any> {
    return this.http.post<any>("https://bookory-api.vercel.app/auth/login", loginData)
  }

  register(registerData: any): Observable<any> {
    return this.http.post<any>("https://bookory-api.vercel.app/auth/register", registerData)

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
