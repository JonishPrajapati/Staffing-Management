using System;
using System.Collections.Generic;
using System.Text;

namespace StaffManagement.Application.Model.Invoice
{
    public class MvInvoice
    {
        public int transactionId { get; set; }
    }

    public class MvInvoiceDetail
    {
        public int invoiceId { get; set; }
    }
}
