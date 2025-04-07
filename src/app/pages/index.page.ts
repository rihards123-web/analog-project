import { Component } from '@angular/core';
import { NavBarComponent } from '../components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NavBarComponent],
  styleUrls: ['./index.styles.css'],
  template: `
    <app-nav-bar></app-nav-bar>
      <section class="landing">
        <div class="center-container">
            <h2>All your shopping needs satisfied</h2>
            <h4>Take time to browse our select in-store goods. Enjoy your shopping <br> experience with Storefront!</h4>
            <button><a href="/products">Discover our collection</a></button>
        </div>
    </section>
  `,
})
export default class IndexPageComponent {}