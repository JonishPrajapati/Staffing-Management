import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MvCustomer } from '../customer.model';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit,AfterViewInit {

  customerForm: FormGroup;
  errorMessage: null;
  action: string;

  selectedCustomer: MvCustomer = <MvCustomer>{}; //select data in object form
  
  constructor(@Inject(MAT_DIALOG_DATA) public data :any,
              private fb: FormBuilder,
              private customerService: CustomerService,
              public dialogRef: MatDialogRef<CustomerFormComponent>) {

    dialogRef.disableClose = true
    this.action = data.action;
    this.selectedCustomer = data.data || {};
   }
  ngAfterViewInit(): void {
    this.customerForm.updateValueAndValidity();
  }

  ngOnInit() {
    this.customerForm = this.fb.group({
      organizationName: ['',Validators.required],
      organizationCategory: ['',Validators.required],
      organizationDescription: ['',Validators.required],
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
    this.dialogRef.close(this.selectedCustomer);
  }

}
