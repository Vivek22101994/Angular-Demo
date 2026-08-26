// auth.service.ts
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, of, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:5012';
  isAuthenticated = signal<boolean>(false);

  constructor(private http: HttpClient) {}

  // Ask backend: "is my cookie valid?"
  checkAuth(): Observable<boolean> {   
    return this.http
      .get(`${this.apiUrl}/api/Auth/me`, { withCredentials: true })
      .pipe(
        tap(res => this.isAuthenticated.set(true)),
        map(res => true),
        catchError(() => {
          this.isAuthenticated.set(false);
          return of(false);
        })
      );
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http
      .post('/api/auth/login', { email, password }, { withCredentials: true })
      .pipe(
        tap(() => this.isAuthenticated.set(true)),
        map(() => true),
        catchError(() => of(false))
      );
  }

  logout(): Observable<void> {    
    return this.http.post<void>(`${this.apiUrl}/api/Auth/logout`, {}, { withCredentials: true }).pipe(
      tap(() => this.isAuthenticated.set(false))
    );
  }
}