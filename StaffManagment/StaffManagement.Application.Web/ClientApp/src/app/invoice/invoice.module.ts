import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceComponent } from './invoice.component';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceService } from './invoice.service';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog'; 
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CdkTableModule } from '@angular/cdk/table';
import {MatCardModule} from '@angular/material/card'; 
import { InvoiceFormComponent } from './invoice-form/invoice-form.component';



const routes: Routes = [
  {
    path:'',
    component: InvoiceComponent,
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    CdkTableModule,
    MatCardModule
  ],
  declarations: [InvoiceComponent,
                 InvoiceFormComponent],
  
  providers: [InvoiceService],
  exports: [
    InvoiceComponent
  ]
})
export class InvoiceModule { }
