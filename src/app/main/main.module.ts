import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { NbButtonModule, NbCardModule, NbLayoutModule, NbListModule } from '@nebular/theme';
import { ProductCardComponent } from './product-list/product-card/product-card.component';
import { PagerComponent } from './pager/pager.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductCardComponent,
    PagerComponent,
    ShoppingCartComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    NbLayoutModule,
    NbCardModule,
    NbButtonModule,
    NbListModule
  ],
})
export class MainModule { }
