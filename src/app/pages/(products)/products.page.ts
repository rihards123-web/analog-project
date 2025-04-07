import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  standalone: true,
  styleUrls: ['./products.styles.css'],
  template: `
    <div>
      <h1>Products Page</h1>
      <p>This is the products route.</p>
    </div>
  `,
})
export default class ProductsPageComponent {}