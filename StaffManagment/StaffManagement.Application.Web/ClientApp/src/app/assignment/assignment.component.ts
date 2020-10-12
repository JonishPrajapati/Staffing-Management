import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TransactionService } from '../transaction/transaction.service';
import { AssignmentFornComponent } from './assignment-forn/assignment-forn.component';
import { MvAssignment } from './assignment.model';
import { AssignmentService } from './assignment.service';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss']
})
export class AssignmentComponent implements OnInit {


  errorMessage:string = null
  displayedColumns: string[];
  dataSource: MvAssignment[] = [];
  selectedAssignment: MvAssignment = <MvAssignment>{};
  selection = new SelectionModel<MvAssignment>(false, []);
  selectionBox = new SelectionModel<MvAssignment>(true, []);

  

  constructor(
      private assignmentService: AssignmentService,
      private snacBar:MatSnackBar,
      private dialog: MatDialog,
      private transactionService: TransactionService
  ) { }

  ngOnInit() {
    this.displayedColumns = ['select', 'assignmentId', 'assignmentName',
                             'firstName', 'designation', 'status','unit','rate'];
  this.getAllAssignment();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selectionBox.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

 /** Selects all rows if they are not all selected; otherwise clear selection. */
 masterToggle() {
  this.isAllSelected() ?
    this.selectionBox.clear() :
    this.dataSource.forEach(row => this.selectionBox.select(row));
}
  getAllAssignment() {
    this.assignmentService.assignmentDetails().subscribe((response) => {
      if (response && response.data) {
        this.dataSource = response.data;
      } else {
        this.openSnackBar("No Data Available here", '');
      }
      console.log(this.dataSource);
      
    })
  }

  assignmentAdd() {
    this.selection.clear();
    this.selectedAssignment = <MvAssignment>{};
    this.openDialog('Add');
  }
  assignmentEdit() {
    this.openDialog('Edit');
  }

  openDialog(action: string) {
    if (action === 'Edit' && !this.selection.hasValue()) {
      this.openSnackBar('Row has not been selected', "");
      return;
    }
    const dialogRef = this.dialog.open(AssignmentFornComponent, {
      data: {
        action: action,
        data: this.selectedAssignment
      }
    });
  

    dialogRef.afterClosed().subscribe((requestedRow) => {
 

      if (requestedRow) {
        if (action === 'Edit') {
          this.assignmentService.assignmentUpdate(requestedRow).subscribe((updated) => {
            this.openSnackBar('Assignment Successfully Updated', "");
            this.getAllAssignment();
          })

        } else {
          this.assignmentService.assignmentAdd(requestedRow).subscribe(added => {
            this.openSnackBar('Assignment Successfully Addedd ', '');
            this.getAllAssignment();
          })
        }
      }else{
        this.openSnackBar("cancelled",'')
      }
    })
  }
  
  trasncationGenerate(){
    if (!this.selectionBox.hasValue()) {
      this.openSnackBar("you haven't select any assignment to further proceed", "");
      return;
    } else {
      if(this.checkStatus(this.selectionBox.selected)){
        this.openSnackBar("Assignment is Closed", "");
      }else
       { this.transactionService.transactionAdd(this.selectionBox.selected).subscribe(res => {
          console.log(res);
          
          this.openSnackBar("generated successfully", "");
          this.getAllAssignment();
          
        });
      }
      
        
    }

  }

  //checking whether the transaction of assignment is active or closed
  checkStatus(array):boolean{
    let check = false;
    array.forEach(status => {
        if(status.status != 'active'){
              check = true;
              return;
        }
    });
    return check;
  }


  rowClick(e: any, row: MvAssignment) {
    this.selectedAssignment = { ...row };
    this.selection.toggle(row);
  }


  openSnackBar(message, action) {
    this.snacBar.open(message, action, {
      duration: 3000,
      panelClass: ['login-snackbar'],
      verticalPosition: 'top',
      horizontalPosition: 'right',
    })
  }

}
