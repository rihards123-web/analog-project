import { Component } from '@angular/core';
import { NavBarComponent } from '@app/components/nav-bar/nav-bar.component';
import { FormBuilder, Validators, ReactiveFormsModule  } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NavBarComponent, ReactiveFormsModule, CommonModule],
  styleUrls: ['./register.styles.css'],
  template: `
    <app-nav-bar></app-nav-bar>
    <div class="container">
    <div class="login-container"> 
    <h2 id="heading">Register</h2>

    <form [formGroup]="form" (ngSubmit)="register()">
     <div class="input-container">
      <input type="text" placeholder="First Name" formControlName="first_name" />
      <input type="text" placeholder="Last Name" formControlName="last_name" />
      <input type="email" placeholder="Email" formControlName="email" />
      <input type="password" placeholder="Password" formControlName="password" />
      </div>
      <button type="submit" id="login-button">Register</button>
    </form>
    <p *ngIf="error" style="color:red">{{ error }}</p>
    </div>
    </div>
  `,
})
export default class RegisterPage {
    form = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  
    error = '';
  
    constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {}
  
    register() {
      this.http.post<{ message: string }>('/api/register', this.form.value, { withCredentials: true }).subscribe({
        next: () => this.router.navigate(['/login']),
        error: (err) => (this.error = err.error?.error || 'Registration failed'),
      });
    }
  }
