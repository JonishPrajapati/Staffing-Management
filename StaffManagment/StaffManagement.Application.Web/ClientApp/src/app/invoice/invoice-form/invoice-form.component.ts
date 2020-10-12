import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MvInvoice, MvInvoiceDetail } from '../invoice.model';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {


  
  selectedInvoice: MvInvoice = <MvInvoice>{};
  selectedInvoiceDetail: MvInvoiceDetail = <MvInvoiceDetail>{};
 
  constructor(
    @Inject(MAT_DIALOG_DATA) public data :any,
    public dialogRef: MatDialogRef<InvoiceFormComponent>
  ) {
    dialogRef.disableClose = true;
    this.selectedInvoice = this.data.invoice
    this.selectedInvoiceDetail = this.data.invoiceDetail;
    
   }

  ngOnInit() {
  }

  cancelClick() {

    this.dialogRef.close('close');
    console.log("cancel");
    
  }

  printInvoice() {

    this.dialogRef.close('print');
  }

}
