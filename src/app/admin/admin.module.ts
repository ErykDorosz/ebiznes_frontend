import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AddProductComponent } from './admin-panel/add-product/add-product.component';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbSelectModule, NbToastrModule
} from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCategoryComponent } from './admin-panel/add-category/add-category.component';


@NgModule({
  declarations: [
    AdminComponent,
    AdminPanelComponent,
    AddProductComponent,
    AddCategoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    NbLayoutModule,
    NbCardModule,
    NbIconModule,
    NbInputModule,
    NbButtonModule,
    NbSelectModule
  ]
})
export class AdminModule { }
