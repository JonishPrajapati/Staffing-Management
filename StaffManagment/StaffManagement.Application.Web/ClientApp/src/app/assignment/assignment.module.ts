import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignmentComponent } from './assignment.component';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog'; 
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { AssignmentService } from './assignment.service';
import { RouterModule, Routes } from '@angular/router';
import { CdkTableModule } from '@angular/cdk/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AssignmentFornComponent } from './assignment-forn/assignment-forn.component';

const routes: Routes = [
  {
    path:'',
    component: AssignmentComponent,
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
    MatSelectModule,
    CdkTableModule,
    MatCheckboxModule
  ],
  declarations: [AssignmentComponent,
                AssignmentFornComponent],
  
  providers: [AssignmentService],
  exports: [
    AssignmentComponent
  ]
})
export class AssignmentModule { }
