import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { Router } from '@angular/router';

export interface User {
  id: number;
  first_name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private isLoadingSubject = new BehaviorSubject<boolean>(true);
  public isLoading$ = this.isLoadingSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // Check authentication status when the service initializes
    this.checkAuthStatus();

    // Set up a navigation event handler to check auth status after navigation
    this.router.events.subscribe(() => {
      this.checkAuthStatus();
    });
  }

  // Check if user is authenticated
  checkAuthStatus(): void {
    console.log('Checking auth status...');
    this.isLoadingSubject.next(true);
    
    this.http.get<{ user: User | null }>('/api/me', { 
      withCredentials: true,
      // Add cache busting parameter to prevent browser caching
      params: { '_': new Date().getTime().toString() }
    })
    .pipe(
      catchError(error => {
        console.error('Error checking auth status:', error);
        this.currentUserSubject.next(null);
        this.isLoadingSubject.next(false);
        return of({ user: null });
      })
    )
    .subscribe({
      next: (response) => {
        console.log('Auth status response:', response);
        this.currentUserSubject.next(response.user);
        this.isLoadingSubject.next(false);
      }
    });
  }

  // Get current user
  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // Get loading state
  get isLoading(): boolean {
    return this.isLoadingSubject.value;
  }

  // Login
  login(email: string, password: string): Observable<any> {
    return this.http.post<{message: string, error?: string}>('/api/login', 
      { email, password }, 
      { withCredentials: true }
    ).pipe(
      tap(response => {
        if (!response.error) {
          // Immediately check auth status
          this.checkAuthStatus();
        }
      })
    );
  }

  // Register
  register(userData: any): Observable<any> {
    return this.http.post<{message: string, error?: string}>('/api/register', 
      userData, 
      { withCredentials: true }
    );
  }

  // Logout
  logout(): Observable<any> {
    return this.http.post('/api/logout', {}, { withCredentials: true })
      .pipe(
        tap(() => {
          this.currentUserSubject.next(null);
        }),
        catchError(error => {
          console.error('Logout failed:', error);
          // Even if the API call fails, clear the local user
          this.currentUserSubject.next(null);
          return of({ message: 'Logged out (client only)' });
        })
      );
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }
}