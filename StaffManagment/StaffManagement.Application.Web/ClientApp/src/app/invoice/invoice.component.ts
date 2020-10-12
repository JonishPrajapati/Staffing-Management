import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InvoiceFormComponent } from './invoice-form/invoice-form.component';
import { MvInvoice, MvInvoiceDetail } from './invoice.model';
import { InvoiceService } from './invoice.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {


  errorMessage: string = null;
  displayedColumns: string[];
  dataSource: MvInvoice[] = [];
  selectedInvoice: MvInvoice = <MvInvoice>{};
  selectedInvoiceDetail: MvInvoiceDetail[]=[];
  selection = new SelectionModel<MvInvoice>(false, []);
  
  constructor(private invoiceService: InvoiceService,
              private dialog: MatDialog,
              private snacBar: MatSnackBar) { }

  ngOnInit() {
    this.displayedColumns = ['invoiceId', 'firstName','organizationName','totalpaid'];
    this.getInvoices();
  }
  getInvoices() {
    this.invoiceService.invoiceDetails().subscribe((response)=>{
      
      if(response && response.data){
        this.dataSource = response.data;
        console.log(this.dataSource);
        
      }else{
      this.openSnackBar("no data","");
      }
    })
  }

  getInvoiceDetail(){
    this.openDialog();
  }

  openDialog(){
    if(!this.selection.hasValue())
    {
      this.invoiceService.singleInvoiceDetails(this.selectedInvoice.invoiceId).subscribe(response =>{
        
        this.selectedInvoiceDetail=response.data
          const dialogRef = this.dialog.open(InvoiceFormComponent,{
             
        data:{
              invoice: this.selectedInvoice,
              invoiceDetail: this.selectedInvoiceDetail
        }
      });
      dialogRef.afterClosed().subscribe(action =>{
        if(action === 'print'){
          console.log(action);
          
          this.openSnackBar("Invoice has been printed Successfully","");
        }else if(action === 'close'){
          this.openSnackBar("Proceed Canceled","");
        }
      })
        
      })   
    }else{
      this.openSnackBar("Please select a row to generate Invoice","");
    }
  }

  checkInvoiceId(array): boolean {
    let value = false;
    array.forEach(checkRow => {
      if (checkRow.InvoiceId) {
        value = true;
        return;
      }
    });
    return value;
  }
  checkCustomer(array): boolean {
    const initialCustomer = array[0].CustomerId;
    let value = false;
    array.forEach(checkRow => {
      if (checkRow.InvoiceId) {
        value = true;
        return;
      }
    });
    return array.every(transaction => transaction.CustomerId === initialCustomer);
  }

  rowClick(e: any, row: MvInvoice) {
    this.selectedInvoice = { ...row };
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
