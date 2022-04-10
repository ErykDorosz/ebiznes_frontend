import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AddProductRequest, Category, CategoryService, ProductService } from '../../../../core/openapi';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  @ViewChild('imageInput')
  imageInput?: ElementRef;

  form: FormGroup;
  categories?: Category[];

  newProduct: AddProductRequest = {
    categoryId: 1,
    image: '',
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
      'image': ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.categoryService.getAll()
      .subscribe(data => this.categories = data);
  }

  addProduct() {
    this.newProduct = this.form.value as AddProductRequest;

    this.productService.addProduct(this.newProduct).subscribe({
      next: _ => {
        this.toastService.success('Added new product!', 'Success!');
        this.form.reset();
        if (this.imageInput) {
          this.imageInput.nativeElement.value = '';
        }
      }
    })
  }

  fileChanged(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }
    const file = input.files[0];

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const image = new Image();
      image.src = e.target.result;
      image.onload = rs => {
        this.form.patchValue({
          image: e.target.result
        });
      }

    }

    reader.readAsDataURL(file)
  }
}
