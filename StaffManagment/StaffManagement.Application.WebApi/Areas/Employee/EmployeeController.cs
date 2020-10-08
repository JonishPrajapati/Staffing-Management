using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using StaffManagement.Application.Model.Person;
using StaffManagement.Application.Service.Person;
using StaffManagement.Application.WebApi.Areas.Base;

namespace StaffManagement.Application.WebApi.Areas.Person
{
    public class EmployeeController : BaseController
    {
        private IEmployeeService _employeeService;

        public EmployeeController(IEmployeeService employeeService)
        {
            this._employeeService = employeeService;
        }
        [HttpGet]
        public string getresult()
        {
            return ("ok");
        }

        [HttpPost]
        public IActionResult EmployeeAdd([FromBody] MvEmployee employee)
        {
            try
            {
                var data = _employeeService.AddEmployee(employee);
                return Ok(data);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        [HttpGet]
        public IActionResult GetEmployeeDetails()
        {
            try
            {
                var details = _employeeService.GetEmployeeDetail();
                return Ok(details);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        [HttpPost]
        public IActionResult EmployeeUpdate([FromBody] MvEmployee employee)
        {
            try
            {
                var data = _employeeService.UpdateEmployee(employee);
                return Ok(data);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
    }
}
