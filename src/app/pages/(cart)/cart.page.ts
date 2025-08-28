import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { NavBarComponent } from '@app/components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, NavBarComponent],
  styleUrls: ['./cart.styles.css'], 
  template: `
    <app-nav-bar></app-nav-bar>
    <div class="wrapper">
      <ng-container *ngIf="!loading && cart.length === 0">
        <h2>You don’t have any items in cart</h2>
      </ng-container>

      <ng-container *ngIf="!loading && cart.length > 0">
        <h2>Your cart items</h2>
        <a href="/products">Back to shopping</a>

        <div class="cart-container">
          <div class="cart-head">
            <p>Product</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
          </div>
          <hr />

          <div *ngFor="let item of cart" class="cart-item">
            <div class="product">
              <img [src]="'/assets/images/' + item.image" />
              <div class="product-info">
                <p>{{ item.title }}</p>
                <button class="remove-from-cart" (click)="removeFromCart(item.id)">Remove</button>
              </div>
            </div>

            <div class="price">
              <p>$ {{ item.price }}</p>
            </div>

            <div class="quantity">
              <p>{{ item.quantity }}</p>
            </div>

            <div class="total">
              <p>$ {{ (item.price * item.quantity).toFixed(2) }}</p>
            </div>
          </div>

          <hr />

          <div class="total-container">
            <div class="cart-total">
              <p>Sub-total</p>
              <p>$ {{ grandTotal.toFixed(2) }}</p>
            </div>

            <div class="cart-total-btn">
              <button [routerLink]="['/checkout']">Check-out</button>
            </div>
          </div>
        </div>
      </ng-container>
    </div>
  `
})
export default class CartPageComponent implements OnInit {
  cart: any[] = [];
  loading = true;
  grandTotal = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<{ cart: any[] }>('/api/cart', { withCredentials: true }).subscribe({
      next: res => {
        this.cart = res.cart;
        this.calculateTotal();
        this.loading = false;
      },
      error: err => {
        if (err.status === 401) {
          this.loading = false;
          this.cart = [];
        }
      }
    });
  }

  calculateTotal() {
    this.grandTotal = this.cart.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);
  }

  removeFromCart(productId: number) {
    this.http.post('/api/cart/remove', { product_id: productId }, { withCredentials: true }).subscribe(() => {
      this.cart = this.cart.filter(item => item.id !== productId);
      this.calculateTotal();
    });
  }
}
