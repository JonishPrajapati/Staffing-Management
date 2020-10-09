using StaffManagement.Application.Model.Transaction;
using System;
using System.Collections.Generic;
using System.Text;

namespace StaffManagement.Application.Service.Transaction
{
    public interface ITransactionService
    {
        dynamic AddTransaction(MvTransaction transaction);
        dynamic GetTransactionDetail();
        dynamic UpdateTransaction(MvTransaction transaction);
    }
}
