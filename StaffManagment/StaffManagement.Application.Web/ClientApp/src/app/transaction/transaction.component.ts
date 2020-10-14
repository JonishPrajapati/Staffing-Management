import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InvoiceService } from '../invoice/invoice.service';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { MvTransaction } from './transaction.model';
import { TransactionService } from './transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  errorMessage: string = null
  displayedColumns: string[];
  dataSource: MvTransaction[] = [];
  selectedTransaction: MvTransaction = <MvTransaction>{};
  selection = new SelectionModel<MvTransaction>(false, []);
  selectionBox = new SelectionModel<MvTransaction>(true, []);

  constructor(
    private transactionService: TransactionService,
    private invoiceService: InvoiceService,
    private snacBar: MatSnackBar,
    private dialog: MatDialog
  ) { }




  ngOnInit() {
    this.displayedColumns = ['select', 'transactionId', 'assignmentName', 'organizationName', 'unit', 'rate',
      'firstName', 'designation', 'totalpaid'];
    this.getAllTransaction();
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
  getAllTransaction() {
    this.transactionService.transactionDetails().subscribe((response) => {
      if (response && response.data) {
        this.dataSource = response.data;
      } else {
        this.openSnackBar("No Data Available here", '');
      }
    })
  }

  transactionAdd() {
    this.selection.clear();
    this.selectedTransaction = <MvTransaction>{};
    this.openDialog('Add');
  }

  transactionEdit() {
    this.openDialog('Edit');
  }

  generateInvoice() {
    if (!this.selectionBox.hasValue()) {
      this.openSnackBar("you haven't select any transaction to further proceed", "");
      return;
    } else {

      if (!this.checkCustomer(this.selectionBox.selected) && !this.checkEmployee(this.selectionBox.selected)) {

        this.openSnackBar("Customer or Employee must be same", "");
        return;


      }
      else {

        this.invoiceService.invoiceAdd(this.selectionBox.selected).subscribe(res => {
          this.openSnackBar("generated successfully", "");
          this.getAllTransaction();
        });
      }
    }
  }

  openDialog(action: string) {
    if (action === 'Edit' && !this.selection.hasValue()) {
      this.openSnackBar('Row has not been selected', "");
      return;
    }
    const dialogRef = this.dialog.open(TransactionFormComponent, {
      data: {
        action: action,
        data: this.selectedTransaction
      }
    });


    dialogRef.afterClosed().subscribe((requestedRow) => {


      if (requestedRow) {
        if (action === 'Edit') {
          this.transactionService.transactionUpdate(requestedRow).subscribe((updated) => {
            this.openSnackBar('Assignment Successfully Updated', "");
            this.getAllTransaction();
          })

        } else {
          this.transactionService.transactionAdd(requestedRow).subscribe(added => {
            this.openSnackBar('Assignment Successfully Addedd ', '');
            this.getAllTransaction();
          })
        }
      } else {
        this.openSnackBar("cancelled", '')
      }
    })
  }

  checkCustomer(array): boolean {
    const initialCustomer = array[0].customerId;
    let value = false;
    array.forEach(checkRow => {
      if (checkRow.TransactioId) {
        value = true;
        return;
      }
    });
    return array.every(selectedCustomer => selectedCustomer.customerId === initialCustomer);
  }
  checkEmployee(array): boolean {
    const initialEmployee = array[0].employeeId;
    let value = false;
    array.forEach(checkRow =>{
      if(checkRow.TransactionId){
          value = true;
          return;
      }
    })
    return array.every(selectedEmployee => selectedEmployee.employeeId === initialEmployee);
  }

  rowClick(e: any, row: MvTransaction) {
    this.selectedTransaction = { ...row };
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
