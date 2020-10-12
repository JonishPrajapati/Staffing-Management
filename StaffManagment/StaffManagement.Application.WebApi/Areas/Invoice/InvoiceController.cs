using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using StaffManagement.Application.Model.Invoice;
using StaffManagement.Application.Service.Invoice;
using StaffManagement.Application.WebApi.Areas.Base;

namespace StaffManagement.Application.WebApi.Areas.Invoice
{
    public class InvoiceController : BaseController
    {
        private IInvoiceService _invoiceService;
        public InvoiceController([FromBody] IInvoiceService invoiceService)
        {
            this._invoiceService = invoiceService;
        }

        [HttpGet]
        public IActionResult GetInvoiceDetail()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            try
            {
                var details = _invoiceService.GetInvoiceDetail();
                return Ok(details);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        [HttpPost]
        public IActionResult InvoiceAdd([FromBody] IEnumerable<MvInvoice> invoice)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            try
            {
                var data = _invoiceService.AddInvoice(invoice);
                return Ok(data);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        [HttpGet]
        public IActionResult GenerateSingleInvoice(string json)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            try
            {
                var data = _invoiceService.GetSingleInvoiceDetails(json);
                return Ok(data);
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
