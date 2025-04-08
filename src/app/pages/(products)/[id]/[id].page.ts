import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="product-container">
      <div *ngIf="loading">Loading...</div>
      <div *ngIf="error">{{ error }}</div>
      
      <div *ngIf="product" class="product-detail">
        <div class="product-image">
          <img src="/assets/images/{{ product.image }}" alt="{{ product.title }}">
        </div>
        
        <div class="product-info">
          <h1 class="product-title">{{ product.title }}</h1>
          <p class="product-price">{{ product.price }} €</p>
          <p>{{ product.description }}</p>
          
          <a routerLink="/products" class="back-button">Back to Products</a>
        </div>
      </div>
    </div>
  `
})
export default class ProductDetailComponent implements OnInit {
  @Input() id: string | undefined;
  
  product: any = null;
  loading = true;
  error = '';
  
  constructor(private http: HttpClient) {}
  
  ngOnInit() {
    if (!this.id) {
      this.error = 'Product ID not found';
      this.loading = false;
      return;
    }
    
    this.http.get<any>(`/api/products/${this.id}`).subscribe({
      next: (data) => {
        if (data.error) {
          this.error = data.error;
        } else {
          this.product = data;
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading product:', err);
        this.error = 'Failed to load product details';
        this.loading = false;
      }
    });
  }
}