import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink],
  styleUrls: ['./nav-bar.component.css'],
  template: `
 <section class="nav-bar">
    <div class="left-placeholder"></div>   
            <ul>
                <li><a href="/">Sākums</a></li>
                <li><a href="/products">Produkti</a></li>
                <li><a href="#">Par mums</a></li>
            </ul>  
        <div class="nav-icons">
            <div class="dropdown">
                <div class="profile-icon"> <img src="/assets/images/Profile.png" alt="" class="dropimg">
                    <div class="dropdown-content">
                            <a href="/register">Reģistrēties</a>
                            <a href="/login">Logoties</a>
                    </div>
                </div>
            </div>
            <div class="cart-icon">
                <a href="/cart"><img src="/assets/images/Cart.png" alt=""></a>
            </div>
        </div>
    </section>
  `
})
export class NavBarComponent {}