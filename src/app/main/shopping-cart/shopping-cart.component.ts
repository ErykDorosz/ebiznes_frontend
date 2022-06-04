import { Component, OnInit } from '@angular/core';
import { CartService} from 'src/app/core/cart.service';
import { CartProduct } from 'src/app/core/cart.model';
import { NbToastrService } from '@nebular/theme';
import { CheckoutPayment, StripeControllerService } from 'src/core/openapi';
import { environment } from 'src/environments/environment';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  products: CartProduct[] = [];
  stripePromise = loadStripe(environment.stripe);
  
  constructor(private cartService: CartService,
              private toastService: NbToastrService,
              private stripeControllerService: StripeControllerService) { }

  ngOnInit(): void {
    this.products = this.cartService.getCart();
  }

  removeProduct(productId: number)
  {
    this.cartService.removeFromCart(productId);
    this.products = this.cartService.getCart();
    this.toastService.success("Product removed from cart!", "Success");
  }
  
  async pay(): Promise<void> {
    // here we create a payment object
    const payment : CheckoutPayment = {
      name: 'Cart payment',
      currency: 'pln',
      amount: this.products.reduce((acc, curr) => acc + curr.product.unitPrice! * 100, 0),
      quantity: 1,
      cancelUrl: 'http://localhost:4200/main/cart',
      successUrl: 'http://localhost:4200/success',
    };

    const stripe = await this.stripePromise;

    // // this is a normal http calls for a backend api
    this.stripeControllerService.paymentWithCheckoutPage(payment).subscribe((data: any) => {
      // I use stripe to redirect To Checkout page of Stripe platform
      stripe!.redirectToCheckout({
        sessionId: data.id,
      });
    });
  }
}
