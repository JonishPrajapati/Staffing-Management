import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeFormComponent } from './employee-form/employee-form/employee-form.component';
import { MvEmployee } from './employee.model';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  errorMessage:string = null
  displayedColumns: string[];
  dataSource: MvEmployee[] = [];
  selectedEmployee: MvEmployee = <MvEmployee>{};
  selection = new SelectionModel<MvEmployee>(false, []);
  
  constructor(
              private employeeService: EmployeeService,
              private dialog: MatDialog,
              private snacbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.displayedColumns = ['employeeId','firstName','middleName','lastName','gender',
                             'country', 'province', 'state',
                             'phone','email','telephone', 'insertPersonId']
    this.getAllEmployees();
  }
  getAllEmployees() {
      this.employeeService.employeeDetails().subscribe((response: any) =>{
          if(response && response.data){
            this.dataSource = response.data;
          }else{
            this.errorMessage = "No Data Available"
          }
      })
  }
  //dialog function
  employeeAdd(){
      this.selection.clear();
      this.selectedEmployee = <MvEmployee>{};
      this.openDialog('Add');
  }

  employeeEdit(){
    this.openDialog('Edit');
  }

  //poping up according to selected button event
  openDialog(action: string) {
    if(action === 'Edit' && !this.selection.hasValue()){
      this.openSnackBar('Please select the row to edit details',"");
      return;
    }
    const dialogRef = this.dialog.open(EmployeeFormComponent,{
      data:{
        action:action, //event result
        data: this.selectedEmployee //displaying selected employee form
      }
    });
    dialogRef.afterClosed().subscribe((requestedRow) =>{
      if(requestedRow){
        this.selectedEmployee = requestedRow;
        console.log("requested row", requestedRow);
        
        if(action === 'Edit'){
            this.employeeService.employeeUpdate(requestedRow).subscribe((updated)=>{
              if(updated){
                
                this.getAllEmployees();
                this.openSnackBar('Employee Successfully Updated',"");
              }
              else{
                this.getAllEmployees();
                this.openSnackBar("Employee couldn't be updated","")
              }
            })
        }else{
          this.employeeService.employeeAdd(requestedRow).subscribe(added =>{
            this.getAllEmployees();
            this.openSnackBar('Employee Successfully Addedd ','');
          })
        }
      }
    })
  }
  openSnackBar(message,action){
    this.snacbar.open(message, action,{
      duration:3000,
      panelClass: ['login-snackbar'],
      verticalPosition: 'top',
      horizontalPosition: 'right',
    })
  }

  rowClick(e: any, row: MvEmployee){
    this.selectedEmployee = {...row};
    this.selection.toggle(row);
    console.log("selected row",row);
    console.log("selected row", this.selectedEmployee);
  }

}

