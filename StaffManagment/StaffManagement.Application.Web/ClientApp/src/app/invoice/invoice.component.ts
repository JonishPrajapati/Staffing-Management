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
  // selectedInvoiceDetail: MvInvoiceDetail[]=[];
  selection = new SelectionModel<MvInvoice>(false, []);
  
  constructor(private invoiceService: InvoiceService,
              private dialog: MatDialog,
              private snacBar: MatSnackBar) { }

  ngOnInit() {
    this.displayedColumns = ['invoiceId', 'fullName','organizationName','totalrate'];
    this.getInvoices();
  }
  getInvoices() {
    this.invoiceService.invoiceDetails().subscribe((response)=>{
      
      if(response && response.data){
        this.dataSource = response.data;
        
      }else{
      this.openSnackBar("no data","");
      }
    })
  }

  getInvoiceDetail(){
  
    this.openDialog();
  }


  openDialog() {
 
    if(this.selection.hasValue()){
      this.invoiceService.singleInvoiceDetails(this.selectedInvoice.invoiceId).subscribe(res =>{
        this.selectedInvoice = res.data
        const dialogRef = this.dialog.open(InvoiceFormComponent,{
          data:{ 
            data: this.selectedInvoice
          }
        });
        dialogRef.afterClosed().subscribe((action) =>{
          if(action === 'print'){
            console.log(action);
            
            this.openSnackBar("Invoice has been printed Successfully","");
          }else if(action === 'close'){
            this.openSnackBar("Proceed Canceled","");
          }
        })
      })
    }
   
   
  }
  rowClick(e: any, row: MvInvoice) {
    this.selectedInvoice = { ...row };
    this.selection.toggle(row);
    console.log(row);
    
  }
  openSnackBar(message,action){
    this.snacBar.open(message, action,{
      duration:3000,
      panelClass: ['login-snackbar'],
      verticalPosition: 'top',
      horizontalPosition: 'right',
    })
  }

}
