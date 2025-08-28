import { Component } from '@angular/core';
import { NavBarComponent } from '@app/components/nav-bar/nav-bar.component';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [NavBarComponent, CommonModule, RouterLink, RouterModule],
  styleUrls: ['./payment.styles.css'],
  template: `
    <app-nav-bar></app-nav-bar>
     <html>
    <body>
        <div class="wrapper">
            <div class="container">

            <div class="payment-container">   
                
                <div class="payment-header">
                    <div class="payment-head">
                        <img src="/assets/images/CreditCardFill.png" alt="">
                        <h3>Credit Card</h3>
                    </div>
                </div>
                
                <div class="card-container">
                    <div class="payment-card">
                        <div class="card">
                            <input type="text" name="" id="card-number" maxlength="19" placeholder="Card Number" required>
                            <input type="text" name="" id="holder-name" placeholder="Holder Name" required>
                        </div>
                    
                        <div class="expiry">
                            <input type="text" name="" id="expiry" placeholder="Experation MM/YY" maxlength="5" required>
                            <input type="text" name="" id="cvv"  placeholder="CVV" required>
                        </div>
                    </div>
                </div>
            </div>
            <div class="buttons">
                <button class="back-to-checkout" [routerLink]="['/checkout']">Back to details</button>
                <button class="go-to-payment" [routerLink]="['/payment-confirmed']">Go to payment</button>
            </div>
        </div>
        </div>
    </body>
</html>


  `,
})
export default class PaymentComponent {}