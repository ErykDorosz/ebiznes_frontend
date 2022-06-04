import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CancelComponent } from './cancel/cancel.component';
import { AdminGuard } from './core/admin.guard';
import { SucessComponent } from './sucess/sucess.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule)
  },
  {
    path: 'admin',
    canLoad: [AdminGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },

  { path: 'cancel', component: CancelComponent },
  { path: 'success', component: SucessComponent },
  
  { path: '', redirectTo: 'main', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
