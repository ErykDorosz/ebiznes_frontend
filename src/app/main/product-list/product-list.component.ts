import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../../../core/openapi';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  currentPage = 0;
  totalPages = 0;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.fetchPage(this.currentPage);
  }

  fetchPage(pageNumber: number): void {
    this.productService.getProductPage(pageNumber).subscribe(
      response => {
        this.products = response.items;
        this.totalPages = response.totalPages;
      });
  }

  onPageChanged(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.fetchPage(this.currentPage);
  }
}
