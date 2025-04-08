import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { NavBarComponent } from '@app/components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, NavBarComponent],
  styleUrls: ['./product.styles.css'],
  template: `
    <app-nav-bar></app-nav-bar>
    
    <div class="wrapper" *ngIf="product">
      <div class="container">
        <div class="container-left">
          <div class="product-image">
            <img src="/assets/images/{{ product.image }}" alt="{{ product.title }}">
          </div>
          <p class="product-subtext">Selected with care for best customer experience</p>
          <p class="free-shipping">🚚 FREE SHIPPING</p>
        </div>
        
        <div class="container-right">
          <h1 class="product-title">{{ product.title }}<sup>®</sup></h1>
          
          <div class="price-cart">
            <p class="product-price"><span class="basePrice">{{ product.price }} €</span></p>

            <div class="quantity-container">
              <button class="quantity-btn decrement" [disabled]="quantity === 1" (click)="updateQuantity(-1)">-</button>
              <span class="quantity-value">{{ quantity }}</span>
              <button class="quantity-btn increment" (click)="updateQuantity(1)">+</button>
            </div>
            
            <button class="add-to-cart" [attr.data-product-id]="product.id" (click)="addToCart()">
              🛒 + Add to cart
            </button>
          </div>
          
          <p id="cart-message">{{ cartMessage }}</p>
          
          <div class="product-description">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. <br>
              Tempore deleniti quo numquam aliquid eius eveniet, at aspernatur. <br>
              Repudiandae dicta hic, ullam, nesciunt <br>
              At ipsam libero deleniti quasi autem ad dolores.</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export default class ProductDetailComponent implements OnInit {
  @Input() id: string | undefined;
  
  product: any = null;
  quantity: number = 1;
  cartMessage: string = '';
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
  
  formatPrice(price: number): string {
    return price.toFixed(2);
  }
  
  updateQuantity(change: number) {
    this.quantity += change;
    if (this.quantity < 1) {
      this.quantity = 1;
    }
  }
  
  addToCart() {
    console.log("🛒 Add to cart clicked! Product ID:", this.product.id);
    
    // Option 1: Store in localStorage (client-side only, like a session)
    this.addToLocalStorage();
    
    // Option 2: Use API endpoint (server-side storage, like Laravel)
    // this.addToCartViaApi();
  }
  
  private addToLocalStorage() {
    // Get existing cart from localStorage or initialize empty array
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if product already exists in cart
    const existingItemIndex = cartItems.findIndex((item: any) => 
      item.product_id === this.product.id
    );
    
    if (existingItemIndex >= 0) {
      // Update quantity if product already in cart
      cartItems[existingItemIndex].quantity += this.quantity;
    } else {
      // Add new item if not in cart
      cartItems.push({
        product_id: this.product.id,
        title: this.product.title,
        price: this.product.price,
        image: this.product.image,
        quantity: this.quantity
      });
    }
    
    // Save back to localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));
    
    // Display success message
    this.cartMessage = "✅ Product added to cart!";
    alert('Product added to cart');
    
    // Clear message after 3 seconds
    setTimeout(() => {
      this.cartMessage = '';
    }, 3000);
  }
  
  private addToCartViaApi() {
    // If you want to use a server API like in your Laravel project
    this.http.post('/api/cart/add', {
      product_id: this.product.id,
      quantity: this.quantity
    }).subscribe({
      next: (response: any) => {
        console.log("✅ Added to cart:", response);
        this.cartMessage = "✅ Product added to cart!";
        alert('Product added to cart');
        
        setTimeout(() => {
          this.cartMessage = '';
        }, 3000);
      },
      error: (error) => {
        console.error("❌ Error:", error);
      }
    });
  }
}