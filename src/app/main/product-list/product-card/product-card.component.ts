import { Component, Input, OnInit } from '@angular/core';
import { ImageService, Product, ProductService } from '../../../../core/openapi';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CartService } from 'src/app/core/cart.service';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input()
  product?: Product;

  image?: SafeUrl;

  constructor(private imageService: ImageService,
              private sanitizer: DomSanitizer,
              private cartService: CartService,
              private toastService: NbToastrService) { }

  ngOnInit(): void {
    if (!this.product) {
      return;
    }

    this.imageService.getImage(this.product.imageFilename).subscribe(response => {
      this.image = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + response.image);
    });
  }

  addToShoppingCart()
  {
    this.cartService.addToCart(this.product!);
    this.toastService.success(`${this.product?.name} added to cart!`, 'Success');
  }
}
