import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogBoxService } from 'src/core/services/dialog-box.service';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { MvCustomer } from './customer.model';
import { CustomerService } from './customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  errorMessage:string = null
  displayedColumns: string[];
  dataSource: MvCustomer[] = [];
  selectedCustomer: MvCustomer = <MvCustomer>{};
  selection = new SelectionModel<MvCustomer>(false, []);
  constructor(
            private customerService: CustomerService,
            private snacBar: MatSnackBar,
            private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.displayedColumns = ['customerId','organizationName','organizationCategory','organizationDescription',
    'country', 'province', 'state',
    'phone','email','telephone', 'insertPersonId']
     this.getAllCustomers();
  }
  getAllCustomers() {
    this.customerService.customerDetails().subscribe((response: any) => {
      if(response && response.data){
        this.dataSource = response.data;
      }else{
        this.errorMessage = "No Data Available"
      }
    })
  }
  //dialog function
  customerAdd(){
    this.selection.clear();
    this.selectedCustomer = <MvCustomer>{};
    this.openDialog('Add');
  }
  customerEdit(){
    this.openDialog('Edit');
  }
  //poping up according to selected button event
  openDialog(action: string) {
    if(action === 'Edit' && !this.selection.hasValue()){
      this.openSnackBar('Please select the row to edit details',"");
      return;
    }
    const dialogRef = this.dialog.open(CustomerFormComponent,{
      data:{
        action:action, //event result
        data: this.selectedCustomer //displaying selected employee form
      }
    });
    dialogRef.afterClosed().subscribe((requestedRow) =>{
      if(requestedRow){
        this.selectedCustomer = requestedRow;
        console.log("requested row", requestedRow);
        
        if(action === 'Edit'){
            this.customerService.customerUpdate(requestedRow).subscribe((updated)=>{
              if(updated){
                
                this.getAllCustomers();
                this.openSnackBar('Employee Successfully Updated',"");
              }
              else{
                this.getAllCustomers();
                this.openSnackBar("Employee couldn't be updated","")
              }
            })
        }else{
          this.customerService.customerAdd(requestedRow).subscribe(added =>{
            this.getAllCustomers();
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

  rowClick(e: any, row: MvCustomer){
    this.selectedCustomer = {...row};
    this.selection.toggle(row);
  }

}
