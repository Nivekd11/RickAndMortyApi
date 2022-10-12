import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/components/login/login.component';

const routes: Routes = [
  {
  path:'login',
  component: LoginComponent
  },
  {
    path:'dashboard',
    loadChildren: ()=> import('./modules/dashboard/dashboard.module').then(m=>m.DashboardModule)
  },
  {
    path:'',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path:'**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
