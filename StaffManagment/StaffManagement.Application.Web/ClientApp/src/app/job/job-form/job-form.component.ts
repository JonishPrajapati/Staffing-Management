import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerService } from 'src/app/customer/customer.service';
import { MvJob } from '../job.model';
import { JobService } from '../job.service';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.scss']
})
export class JobFormComponent implements OnInit, AfterViewInit{

  jobForm: FormGroup;
  errorMessage: null;
  action: string;
  selectedJob: MvJob = <MvJob>{}; //select data in object form
  customers = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data :any,
              private fb: FormBuilder,
              private jobService: JobService,
              private customerService: CustomerService,
              public dialogRef: MatDialogRef<JobFormComponent>) {

dialogRef.disableClose = true
this.action = data.action;
this.selectedJob = data.data || {};
}
  ngAfterViewInit(): void {
    this.jobForm.updateValueAndValidity();
  }

  ngOnInit() {
    this.jobForm = this.fb.group({
      designation: [this.selectedJob.designation,Validators.required],
      organizationId: [this.selectedJob.organizationId,Validators.required]
    })
    this.getCompanyName();
  }

  getCompanyName(){
    this.customerService.customerDetails().subscribe((res) =>{
      if(res && res.data){
        res.data.forEach(element => {
          if(element.organizationName){
            this.customers.push({
                OrganizationId: element.OrganizationId,
                customerName: element.CustomerName
            })
          }
        });
      }
    })
  }

  onClose(){
    this.dialogRef.close();
  }
  onSubmit(){
    this.dialogRef.close(this.selectedJob);
  }


}
