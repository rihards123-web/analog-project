import { Component } from '@angular/core';
import { NavBarComponent } from '@app/components/nav-bar/nav-bar.component';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [NavBarComponent, CommonModule, RouterLink, RouterModule],
  styleUrls: ['./payment-confirmed.styles.css'],
  template: `
    <app-nav-bar></app-nav-bar>
    
    <html>
    <body>
        <div class="wrapper">
            <div class="container">

                <div class="image-container">
                     <img src="/assets/images/CheckCircle.png" alt="">
                </div>

                <div class="header-container">
                    <h2>Payment Confirmed</h2>
                    <p>ORDER #2132</p>
                </div>

                <div class="desc-container">
                    <p>Thank you for buying from Storefront. The nature is grateful to you. <br>
                       Now that your order is confirmed it will be ready to ship in 2 days. <br>
                       Please check your inbox in the future for your order updates.</p>
                </div>

                <div class="button">
                    <button class="back-to-shopping" [routerLink]="['/products']">Back to shopping</button>
                </div>

            </div>
        </div>
    </body>
</html>

  `,
})
export default class PaymentConfirmedComponent {}