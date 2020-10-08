import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MvEmployee } from '../../employee.model';
import { EmployeeService } from '../../employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit, AfterViewInit {

  employeeForm: FormGroup;
  errorMessage: null;
  errorMessageType: any = {
    invalidForm: 'Data Must Be Required'
  }
  action:string;
  selectedEmployee: MvEmployee = <MvEmployee>{}; //select data in object form

  constructor(@Inject(MAT_DIALOG_DATA) public data :any,
              private fb: FormBuilder,
              private employeeService: EmployeeService,
              public dialogRef: MatDialogRef<EmployeeFormComponent>) {

                dialogRef.disableClose = true
                this.action = data.action;
                this.selectedEmployee = data.data || {};
               }
  ngAfterViewInit(): void {
    this.employeeForm.updateValueAndValidity();
  }

  ngOnInit() {
    this.employeeForm = this.fb.group({
        firstName: ['',Validators.required],
        middleName: ['',Validators.required],
        lastName: ['',Validators.required],
        gender: ['',Validators.required],
        country: ['',Validators.required],
        province:['',Validators.required],
        state:['',Validators.required],
        phone:['',Validators.required],
        email:['',Validators.required],
        telephone:['',Validators.required]
    })
  }
  onClose(){
    this.dialogRef.close();
  }
  onSubmit(){
    this.dialogRef.close(this.selectedEmployee);
  }

}
