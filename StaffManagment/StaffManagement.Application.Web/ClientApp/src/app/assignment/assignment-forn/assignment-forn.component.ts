import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { validateBasis } from '@angular/flex-layout';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerService } from 'src/app/customer/customer.service';
import { EmployeeService } from 'src/app/employee/employee.service';
import { JobService } from 'src/app/job/job.service';
import { MvAssignment } from '../assignment.model';
import { AssignmentService } from '../assignment.service';

@Component({
  selector: 'app-assignment-forn',
  templateUrl: './assignment-forn.component.html',
  styleUrls: ['./assignment-forn.component.scss']
})
export class AssignmentFornComponent implements OnInit,AfterViewInit {


  assignmentForn: FormGroup;
  errorMessage: null;
  action: string;
  employees = [];
  jobs =[];
  selectedAssignment: MvAssignment = <MvAssignment>{}; //select data in object form
  
  constructor(@Inject(MAT_DIALOG_DATA) public data :any,
              private fb: FormBuilder,
              private employeeService: EmployeeService,
              private jobService: JobService,
              private assignmentService: AssignmentService,
              public dialogRef: MatDialogRef<AssignmentFornComponent>) {

    dialogRef.disableClose = true
    this.action = data.action;
    this.selectedAssignment = data.data || {};
   }
  ngAfterViewInit(): void {
    this.assignmentForn.updateValueAndValidity();
  }

  ngOnInit() {
      this.assignmentForn = this.fb.group({
        assignmentName: ['',Validators.required],
        employeeId:[this.selectedAssignment.employeeId,Validators.required],
        jobId: [this.selectedAssignment.jobId,Validators.required],
        status: ['',Validators.required]
      })
      this.getEmployeeName();
      this.getJobTitle();
  }
  
  /**getting specific employee for an assignment */
  getEmployeeName(){
      this.employeeService.employeeDetails().subscribe((res)=>{
        console.log(res);
        
        if(res && res.data){
            res.data.forEach(element => {
                if(element.employeeId){
                      this.employees.push({
                        employeeId: element.employeeId,
                        firstName: element.firstName
                      })
                }
                console.log(element.firstName);
                
            });
          }
      })
  }
  /** Jobs are only created by registered company */
  getJobTitle(){
    this.jobService.jobDetails().subscribe((res) =>{
      if(res && res.data){
        res.data.forEach(element => {
          if(element.jobId){
            this.jobs.push({
                jobId: element.jobId,
                designation: element.designation
            })
          }
          console.log(element.designation,"jobs");
          
        });
      }
    })
  }
  

  onClose(){
    this.dialogRef.close();
  }
  onSubmit(){
    this.dialogRef.close(this.selectedAssignment);
  }

}
