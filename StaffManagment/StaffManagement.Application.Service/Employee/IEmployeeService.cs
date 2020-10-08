using StaffManagement.Application.Model.Person;
using System;
using System.Collections.Generic;
using System.Text;

namespace StaffManagement.Application.Service.Person
{
   public interface IEmployeeService
    {
        dynamic AddEmployee(MvEmployee employee);
        dynamic GetEmployeeDetail();
        dynamic UpdateEmployee(MvEmployee employee);
    }
}
