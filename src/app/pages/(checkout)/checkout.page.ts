import { Component } from '@angular/core';
import { NavBarComponent } from '@app/components/nav-bar/nav-bar.component';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, NavBarComponent],
  styleUrls: ['./checkout.styles.css'],
  template: `
    <app-nav-bar></app-nav-bar>
      <html>
    <body>
        <div class="wrapper">
            <form action="">
        
            <div class="login-container">

                <div class="login-header">
                    <h3>Shipping Address</h3>
                </div>

                <div class="user_name">
                    <input type="text" name="" id="" placeholder="Name" required>
                    <input type="text" name="" id="" placeholder="Second Name"required>
                </div>

                <div class="user_address">
                    <input type="text" name="" id="" placeholder="Address and number" required>
                    <input type="text" name="" id="" placeholder="Shipping note (optional)">
                </div>

                <div class="user_city">
                    <input type="text" name="" id="" placeholder="City" required>
                    <input type="text" name="" id="" placeholder="Postal Code" required>
                </div>

                <div class="user_country">
                    <label for="country">Country/Region</label>
                    <select name="" id="country">
                        <option value="Sweeden">Sweeden</option>
                        <option value="Finland">Finland</option>
                        <option value="Estonia">Estonia</option>
                        <option value="Latvia">Latvia</option>
                        <option value="Lithuania">Lithuania</option>
                        <option value="Poland">Poland</option>
                        <option value="Germany">Germany</option>
                        <option value="Denmark">Denmark</option>
                    </select>
                </div>

                <div class="checkmark">
                    <input type="checkbox" name="" id="">
                    <p>Save this information for future checkout</p>
                </div>

                <div class="buttons">
                    <button class="back-to-cart"><a href="/cart">Back to cart</a></button>
                    <button class="go-to-shopping" [routerLink]="['/payment']">Go to shipping</button>
                </div>

            </div>
        </form>
        </div>
    </body>
</html>
  `,
})
export default class CheckOutComponent {}