import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { NavBarComponent } from '@app/components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, RouterLink, NavBarComponent],
  styleUrls: ['./products.styles.css'],
  template: `
   <app-nav-bar></app-nav-bar>
    <div class="container-heading">
      <h2>Products</h2>
      <p>Order it for you or for your beloved ones</p>
    </div>

    <div class="container-products">
      <div class="product-card" *ngFor="let product of products">
      <a [routerLink]="['/products', product.id]">
        <img src="/assets/images/{{ product.image }}" alt="{{ product.title }}">
        <h2>{{ product.title }}</h2>
        <p>{{ product.price }} €</p>
        </a>
      </div>
    </div>
  `
})
export default class ProductsListComponent implements OnInit {
  products: any[] = [];
  loading = true;
  error = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('/api/products').subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading products:', err);
        this.error = err.message;
        this.loading = false;
      }
    });
  }
}