import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path:'employee',
    loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule )
  },
  {
    path:'customer',
    loadChildren:() => import('./customer/customer.module').then(m => m.CustomerModule)
  },
  {
    path:'job',
    loadChildren:() => import('./job/job.module').then(m=> m.JobModule)
  },
  {
    path:'assignment',

    loadChildren:() => import('./assignment/assignment.module').then(m => m.AssignmentModule)
  },
  {
    path:'login',

    loadChildren:() => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path:'transaction',
    loadChildren:() => import ('./transaction/transaction.module').then(m=> m.TransactionModule)
  },
  {
    path:'invoice',
    loadChildren:()=> import ('./invoice/invoice.module').then(m=>m.InvoiceModule)
  }
]

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
