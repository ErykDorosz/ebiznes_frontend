import { Component, OnInit } from '@angular/core';
import { CartService } from '../core/cart.service';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-sucess',
  templateUrl: './sucess.component.html',
  styleUrls: ['./sucess.component.scss']
})
export class SucessComponent implements OnInit {

  constructor(private cartService: CartService,
              private toastService: NbToastrService,
              private router: Router) { }

  ngOnInit() {
    this.cartService.clearCart();
    this.toastService.success('Your order has been placed successfully', 'Success!');
    this.router.navigate(['/']);
  }


}
