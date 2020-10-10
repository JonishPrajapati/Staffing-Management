import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssignmentService } from 'src/app/assignment/assignment.service';
import { JobService } from 'src/app/job/job.service';
import { MvTransaction } from '../transaction.model';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent implements OnInit,AfterViewInit {

  transactionForm: FormGroup;
  errorMessage: null;
  action: string;
  assignment = [];
  job=[];
  selectedTransaction: MvTransaction = <MvTransaction>{}; //select data in object form

  constructor(@Inject(MAT_DIALOG_DATA) public data :any,
  private fb: FormBuilder,
  private transactionService: TransactionService,
  private jobService: JobService,
  private assignmentService: AssignmentService,

  public dialogRef: MatDialogRef<TransactionFormComponent>) {

dialogRef.disableClose = true
this.action = data.action;
this.selectedTransaction = data.data || {};
}
  ngAfterViewInit(): void {
    this.transactionForm.updateValueAndValidity();
  }

  ngOnInit() {
    this.transactionForm = this.fb.group({
      assignmentId: [this.selectedTransaction.assignmentId,Validators.required],
      rate: ['',Validators.required],
      unit: ['',Validators.required],
      jobId:[this.selectedTransaction.jobId,Validators.required]
    })
    this.getAssignmentName();
    this.getJobName();
  }
  getJobName() {
     this.jobService.jobDetails().subscribe((res)=>{
       
      if(res && res.data){
        res.data.forEach(element => {
            if(element.jobId){
                  this.job.push({
                    jobId: element.jobId,
                    name: element.designation
                  })
            }
            console.log(element.designation);
            
        });
      }
     })
  }
   /**getting specific assignmentName for Transaction */
   getAssignmentName(){
    this.assignmentService.assignmentDetails().subscribe((res)=>{
     
      if(res && res.data){
          res.data.forEach(element => {
              if(element.assignmentId){
                    this.assignment.push({
                      assignmentId: element.assignmentId,
                      name: element.assignmentName
                    })
              }
              console.log(element.assignmentName);
              
          });
        }
    })
}
onClose(){
  this.dialogRef.close();
}
onSubmit(){
  this.dialogRef.close(this.selectedTransaction);
}

}
