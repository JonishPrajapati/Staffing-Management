import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JobFormComponent } from './job-form/job-form.component';
import { MvJob } from './job.model';
import { JobService } from './job.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {

  errorMessage:string = null
  displayedColumns: string[];
  dataSource: MvJob[] = [];
  selectedJob: MvJob = <MvJob>{};
  selection = new SelectionModel<MvJob>(false, []);
  

  constructor( 
      private jobService: JobService,
      private snacBar:MatSnackBar,
      private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.displayedColumns = ['jobId','designation','organizationName', 'insertPersonId']
     this.getAllJobs();
  }
  getAllJobs() {
    this.jobService.jobDetails().subscribe((response: any) => {
      if(response && response.data){
        this.dataSource = response.data;
      }else{
        this.errorMessage = "No Data Available"
      }
    })
  }

   //dialog function
   jobAdd(){
    this.selection.clear();
    this.selectedJob = <MvJob>{};
    this.openDialog('Add');
  }
  jobEdit(){
    this.openDialog('Edit');
  }
  openDialog(action: string) {
    if(action === 'Edit' && !this.selection.hasValue()){
      this.openSnackBar('Please select the row to edit details',"");
      return;
    }
    const dialogRef = this.dialog.open(JobFormComponent,{
      data:{
        action:action, //event result
        data: this.selectedJob //displaying selected employee form
      }
    });
    dialogRef.afterClosed().subscribe((requestedRow) =>{
      if(requestedRow){
        this.selectedJob = requestedRow;
        console.log("requested row", requestedRow);
        
        if(action === 'Edit'){
            this.jobService.jobUpdate(requestedRow).subscribe((updated)=>{
              if(updated){
                
                this.getAllJobs();
                this.openSnackBar('Employee Successfully Updated',"");
              }
              else{
                this.getAllJobs();
                this.openSnackBar("Employee couldn't be updated","")
              }
            })
        }else{
          this.jobService.jobAdd(requestedRow).subscribe(added =>{
            this.getAllJobs();
            this.openSnackBar('Employee Successfully Addedd ','');
          })
        }
      }
    })
  }

  openSnackBar(message,action){
    this.snacBar.open(message, action,{
      duration:3000,
      panelClass: ['login-snackbar'],
      verticalPosition: 'top',
      horizontalPosition: 'right',
    })
  }
  rowClick(e: any, row: MvJob){
    this.selectedJob = {...row};
    this.selection.toggle(row);
  }

}
