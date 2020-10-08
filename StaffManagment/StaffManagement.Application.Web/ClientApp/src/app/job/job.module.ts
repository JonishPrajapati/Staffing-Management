import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobComponent } from './job.component';
import { RouterModule, Routes } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog'; 
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { JobService } from './job.service';
import { JobFormComponent } from './job-form/job-form.component';
import { CdkTableModule } from '@angular/cdk/table';


const routes: Routes = [
  {
    path:'',
    component: JobComponent,
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
    CdkTableModule
  ],
  declarations: [JobComponent,
  JobFormComponent],
  providers: [JobService],
  exports: [
    JobComponent
  ]
})
export class JobModule { }
