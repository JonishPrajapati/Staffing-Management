import { SelectionModel } from "@angular/cdk/collections";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { InvoiceFormComponent } from "./invoice-form/invoice-form.component";
import { MvInvoice, MvInvoiceDetail } from "./invoice.model";
import { InvoiceService } from "./invoice.service";

@Component({
  selector: "app-invoice",
  templateUrl: "./invoice.component.html",
  styleUrls: ["./invoice.component.scss"],
})
export class InvoiceComponent implements OnInit {
  errorMessage: string = null;
  displayedColumns: string[];
  dataSource: MvInvoice[] = [];
  selectedInvoice: MvInvoice = <MvInvoice>{};
  selection = new SelectionModel<MvInvoice>(false, []);

  constructor(
    private invoiceService: InvoiceService,
    private dialog: MatDialog,
    private snacBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.displayedColumns = [
      "invoiceId",
      "fullName",
      "organizationName",
      "totalrate",
    ];
    this.getInvoices();
  }
  getInvoices() {
    this.invoiceService.invoiceDetails().subscribe((response) => {
      if (response && response.data) {
        this.dataSource = response.data;
      } else {
        this.openSnackBar("no data", "");
      }
    });
  }

  getInvoiceDetail() {
    this.openDialog();
  }

  openDialog() {
    if (this.selection.hasValue()) {
      this.invoiceService
        .singleInvoiceDetails(this.selectedInvoice.invoiceId)
        .subscribe((res) => {
          if (res && res.data) {
            this.selectedInvoice = res.data;

            const dialogRef = this.dialog.open(InvoiceFormComponent, {
              data: {
                invoice: this.selectedInvoice,
              },
            });
            dialogRef.afterClosed().subscribe((action) => {
              if (action === "print") {
                this.openSnackBar("Invoice has been printed Successfully", "");
              } else if (action === "close") {
                this.openSnackBar("Proceed Canceled", "");
              }
            });
          }
        });
    } else {
      this.openSnackBar("Please select invoice to see additional details", "");
    }
  }
  rowClick(e: any, row: MvInvoice) {
    this.selectedInvoice = { ...row };
    this.selection.toggle(row);
  }
  openSnackBar(message, action) {
    this.snacBar.open(message, action, {
      duration: 2000,
      panelClass: ["login-snackbar"],
      verticalPosition: "top",
      horizontalPosition: "right",
    });
  }
}
