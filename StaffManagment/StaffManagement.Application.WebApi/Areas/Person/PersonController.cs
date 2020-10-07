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
    public class PersonController : BaseController
    {
        private IPersonService _personService;

        public PersonController(IPersonService personService)
        {
            this._personService = personService;
        }
        [HttpGet]
        public string getresult()
        {
            return ("ok");
        }

        [HttpPost]
        public IActionResult PersonAdd([FromBody] MvPerson person)
        {
            try
            {
                var data = _personService.AddPerson(person);
                return Ok(data);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        [HttpGet]
        public IActionResult GetPersonDetails()
        {
            try
            {
                var details = _personService.GetPersonDetail();
                return Ok(details);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        [HttpPost]
        public IActionResult PersonUpdate([FromBody] MvPerson person)
        {
            try
            {
                var data = _personService.UpdatePerson(person);
                return Ok(data);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
    }
}
