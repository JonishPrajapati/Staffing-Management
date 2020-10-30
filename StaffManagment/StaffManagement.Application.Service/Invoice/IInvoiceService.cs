using StaffManagement.Application.Model.Invoice;
using System;
using System.Collections.Generic;
using System.Text;

namespace StaffManagement.Application.Service.Invoice
{
    public interface IInvoiceService
    {
        dynamic AddInvoice(IEnumerable<MvInvoice> invoice);
        dynamic GetInvoiceDetail();

        dynamic GetSingleInvoiceDetails(MvInvoice invoice);
    }
}

