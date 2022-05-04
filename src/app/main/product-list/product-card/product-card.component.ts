import { Component, Input, OnInit } from '@angular/core';
import { ImageService, Product } from '../../../../core/openapi';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

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
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    if (!this.product) {
      return;
    }

    this.imageService.getImage(this.product.imageFilename).subscribe(response => {
      this.image = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + response.image);
    });
  }
}
