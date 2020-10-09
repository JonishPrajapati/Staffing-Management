import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { validateBasis } from '@angular/flex-layout';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
 
  selectedAssignment: MvAssignment = <MvAssignment>{}; //select data in object form
  
  constructor(@Inject(MAT_DIALOG_DATA) public data :any,
              private fb: FormBuilder,
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
        firstName:['',Validators.required],
        lastName:['',Validators.required],
        designation: ['',Validators.required],
        status: ['',Validators.required]
      })
  }

  onClose(){
    this.dialogRef.close();
  }
  onSubmit(){
    this.dialogRef.close(this.selectedAssignment);
  }

}
