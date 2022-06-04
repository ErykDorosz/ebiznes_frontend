import { Injectable } from '@angular/core';
import { Product } from 'src/core/openapi';
import { CartProduct } from './cart.model';

const CART_KEY = 'cart';



@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  getCart(): CartProduct[] {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  }

  addToCart(product: Product) {
    const cart = this.getCart();
    const item = cart.find(i => i.product.id === product.id);
    if (item) {
      item.quantity++;
    }
    else {
      cart.push({ product, quantity: 1 });
    }
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  removeFromCart(productId: number) {
    const cart = this.getCart();
    const item = cart.find(i => i.product.id === productId);
    if (item) {
      if (item.quantity > 1) {
        item.quantity--;
      }
      else {
        cart.splice(cart.indexOf(item), 1);
      }
    }
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  clearCart() {
    localStorage.setItem(CART_KEY, '[]');
  }
}
