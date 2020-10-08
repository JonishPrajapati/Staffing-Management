using StaffManagement.Application.Model.Address;
using System;
using System.Collections.Generic;
using System.Text;

namespace StaffManagement.Application.Service.Address
{
    public interface ICustomerService
    {
        dynamic AddCustomer(MvCustomer customer);
        dynamic GetCustomerDetail();
        dynamic UpdateCustomer(MvCustomer customer);
    }
}
