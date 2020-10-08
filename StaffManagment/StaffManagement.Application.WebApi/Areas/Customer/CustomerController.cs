using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using StaffManagement.Application.Model.Address;
using StaffManagement.Application.Service.Address;
using StaffManagement.Application.WebApi.Areas.Base;

namespace StaffManagement.Application.WebApi.Areas.Address
{
    public class CustomerController : BaseController
    {
        private ICustomerService _customerService;

        public CustomerController(ICustomerService customerService)
        {
            this._customerService = customerService;
        }
        [HttpGet]
        public string getresult()
        {
            return ("ok");
        }

        [HttpPost]
        public IActionResult CustomerAdd([FromBody] MvCustomer customer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            try
            {
                var data = _customerService.AddCustomer(customer);
                return Ok(data);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        [HttpGet]
        public IActionResult GetCustomerDetails()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            try
            {
                var details = _customerService.GetCustomerDetail();
                return Ok(details);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        [HttpPost]
        public IActionResult CustomerUpdate([FromBody] MvCustomer customer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            try
            {
                var data = _customerService.UpdateCustomer(customer);
                return Ok(data);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
    }
}
