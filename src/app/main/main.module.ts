import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { NbCardModule, NbLayoutModule } from '@nebular/theme';
import { ProductCardComponent } from './product-list/product-card/product-card.component';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductCardComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    NbLayoutModule,
    NbCardModule,
  ],
})
export class MainModule { }
