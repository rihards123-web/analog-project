import { Component } from '@angular/core';
import { NavBarComponent } from '@app/components/nav-bar/nav-bar.component';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavBarComponent, ReactiveFormsModule, CommonModule],
  styleUrls: ['./login.styles.css'],
  template: `
    <app-nav-bar></app-nav-bar>
<div class="container">
<div class="login-container"> 
<h2 id="heading">Login</h2>

    <form [formGroup]="form" (ngSubmit)="login()" >
    <div class="input-container">
      <input type="email" placeholder="Email" formControlName="email" />
      <input type="password" placeholder="Password" formControlName="password" />
      </div>
      <button type="submit" id="login-button">Login</button>
        </form>
        <p *ngIf="error" style="color:red">{{ error }}</p>
      </div>
</div>
  `,
})
export default class LoginPage {
    form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  
    error = '';
  
    constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {}
  
    login() {
      this.http.post<{ message: string }>('/api/login', this.form.value, { withCredentials: true }).subscribe({
        next: () => this.router.navigate(['/']), // redirect after login
        error: (err) => (this.error = err.error?.error || 'Login failed'),
      });
    }
  }