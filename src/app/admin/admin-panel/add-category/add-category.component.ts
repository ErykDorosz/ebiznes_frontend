import { Component, OnInit } from '@angular/core';
import { AddCategoryRequest, CategoryService } from '../../../../core/openapi';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {

  form: FormGroup
  constructor(private categoryService: CategoryService,
              private toastService: NbToastrService,
              private fb: FormBuilder) {
    this.form = fb.group({
      'categoryName': ['', Validators.required],
      'categoryDescription': ['', Validators.required]
    })
  }

  addCategory() {
    const newCategory = this.form.value as AddCategoryRequest;

    this.categoryService.add(newCategory).subscribe({
      next: _ => {
        this.toastService.success('Added new category!', 'Success!');
        this.form.reset();
      }
    });
  }

}
