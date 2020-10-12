using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using StaffManagement.Application.Model.Transaction;
using StaffManagement.Application.Service.Transaction;
using StaffManagement.Application.WebApi.Areas.Base;

namespace StaffManagement.Application.WebApi.Areas.Transaction
{
    public class TransactionController : BaseController
    {

        private ITransactionService _transactionService;

        public TransactionController(ITransactionService assignmentService)
        {
            this._transactionService = assignmentService;
        }
        [HttpGet]
        public string getresult()
        {
            return ("ok");
        }
        [HttpPost]
        public IActionResult TransactionAdd([FromBody] IEnumerable<MvTransaction> transaction)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            try
            {
                var data = _transactionService.AddTransaction(transaction);
                return Ok(data);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        [HttpGet]
        public IActionResult GetTransactionDetails()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            try
            {
                var details = _transactionService.GetTransactionDetail();
                return Ok(details);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        [HttpPost]
        public IActionResult TransactionUpdate([FromBody] MvTransaction transaction)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            try
            {
                var data = _transactionService.UpdateTransaction(transaction);
                return Ok(data);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
    }
}
