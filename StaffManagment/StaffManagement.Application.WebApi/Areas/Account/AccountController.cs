using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using StaffManagement.Application.Model.Login;
using StaffManagement.Application.Service.Account;
using StaffManagement.Application.WebApi.Areas.Base;

namespace StaffManagement.Application.WebApi.Areas.Account
{
    public class AccountController : BaseController
    {
        private ILoginService _loginService;

        public AccountController(ILoginService loginService)
        {
            this._loginService = loginService;
        }
        [HttpGet]
        public string getresult()
        {
            return ("ok");
        }
     
        [HttpPost]
        public IActionResult UserLogin([FromBody] MvLogin login)
        {

            //if (!ModelState.IsValid)
            //{
            //    return BadRequest();
            //}

            try
            {
                var dataLogin = _loginService.GetLogin(login);
                return Ok(dataLogin);
            }
            catch (Exception)
            {

                throw;
            }
        }
        [HttpGet]
        public IActionResult UserDetail(string json)
        {

            try
            {
                var data = _loginService.GetDetails(json);
                return Ok(data);
            }
            catch (Exception)
            {

                throw;
            }
        }
        [HttpGet]
        public IActionResult AllUser()
        {
            try
            {
                var data = _loginService.AllDetails();
                return Ok(data);
            }
            catch (Exception ex)
            {
                throw;
            }

        }
    }
   
}
