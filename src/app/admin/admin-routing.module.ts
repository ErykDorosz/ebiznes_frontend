import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AddProductComponent } from './admin-panel/add-product/add-product.component';

const routes: Routes = [
  { path: 'panel', component: AdminPanelComponent },
  { path: 'product/add', component: AddProductComponent },
  { path: '**', redirectTo: 'panel', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
