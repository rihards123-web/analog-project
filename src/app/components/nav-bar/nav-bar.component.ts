import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  styleUrls: ['./nav-bar.component.css'],
  template: `
    <section class="nav-bar">
      <div class="left-placeholder"></div>
      <ul>
        <li><a [routerLink]="['/']">Sākums</a></li>
        <li><a [routerLink]="['/products']">Produkti</a></li>
        <li><a [routerLink]="['/about']">Par mums</a></li>
      </ul>
      <div class="nav-icons">
        <div class="dropdown">
          <div class="profile-icon">
            <img src="/assets/images/Profile.png" alt="" class="dropimg">
            <div class="dropdown-content">
              <ng-container *ngIf="loading">
                <p>Ielādē lietotāju...</p>
              </ng-container>

              <ng-container *ngIf="!loading && user">
                <p>Sveiks, {{ user.first_name }}</p>
                <hr />
                <a [routerLink]="['/profile']">Profils</a>
                <button (click)="logout()" style="cursor: pointer;">Izrakstīties</button>
              </ng-container>

              <ng-container *ngIf="!loading && !user">
                <p>Sveiki, Viesi</p>
                <a [routerLink]="['/register']">Reģistrēties</a>
                <a [routerLink]="['/login']">Logoties</a>
              </ng-container>
            </div>
          </div>
        </div>

        <div class="cart-icon">
          <a [routerLink]="['/cart']"><img src="/assets/images/Cart.png" alt=""></a>
        </div>
      </div>
    </section>
  `,
})
export class NavBarComponent implements OnInit, OnDestroy {
  user: any = null;
  loading = true;
  private userSubscription: Subscription | null = null;
  private loadingSubscription: Subscription | null = null;

  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

  ngOnInit() {
    console.log('NavBar initializing...');
    
    // Subscribe to loading state changes
    this.loadingSubscription = this.authService.isLoading$.subscribe(loading => {
      this.loading = loading;
      console.log('Loading state updated:', loading);
    });
    
    // Subscribe to user state changes
    this.userSubscription = this.authService.currentUser$.subscribe(user => {
      this.user = user;
      console.log('User state updated:', user);
    });
    
    // Force a check of authentication status
    this.authService.checkAuthStatus();
  }

  ngOnDestroy() {
    // Clean up subscriptions to prevent memory leaks
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }

  logout() {
    console.log('Logging out...');
    this.authService.logout().subscribe({
      next: () => {
        console.log('👋 User logged out');
        // Navigate to home page without a full page reload
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Logout error:', err);
        this.router.navigate(['/']);
      }
    });
  }
}