import { Component, OnInit } from '@angular/core';
import { AddProductRequest, Category, CategoryService, ProductService } from '../../../../core/openapi';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  form: FormGroup;
  categories?: Category[];

  newProduct: AddProductRequest = {
    categoryId: 1,
    image: 'foo',
    name: '',
    unitPrice: 0
  }

  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private toastService: NbToastrService,
              private fb: FormBuilder) {
    this.form = fb.group({
      'name': ['', Validators.required],
      'unitPrice': ['', [Validators.required, Validators.min(0)]],
      'categoryId': ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.categoryService.getAll()
      .subscribe(data => this.categories = data);
  }

  addProduct() {
    this.newProduct = this.form.value as AddProductRequest;
    this.newProduct.image = 'asdf';

    this.productService.addProduct(this.newProduct).subscribe({
      next: _ => {
        this.toastService.success('Added new product!');
      }
    })
  }

}
