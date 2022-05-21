import { Component, OnInit } from '@angular/core';
import { CartService} from 'src/app/core/cart.service';
import { CartProduct } from 'src/app/core/cart.model';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  products: CartProduct[] = [];

  constructor(private cartService: CartService,
              private toastService: NbToastrService) { }

  ngOnInit(): void {
    this.products = this.cartService.getCart();
  }

  removeProduct(productId: number)
  {
    this.cartService.removeFromCart(productId);
    this.products = this.cartService.getCart();
    this.toastService.success("Product removed from cart!", "Success");
  }
  
  pay()
  {

  }
}
