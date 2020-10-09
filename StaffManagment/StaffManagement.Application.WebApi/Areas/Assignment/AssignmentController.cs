using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using StaffManagement.Application.Model.Assignment;
using StaffManagement.Application.Service.Assignment;
using StaffManagement.Application.WebApi.Areas.Base;

namespace StaffManagement.Application.WebApi.Areas.Assignment
{
    public class AssignmentController : BaseController
    {
        private IAssignmentService _assignmentService;

        public AssignmentController(IAssignmentService assignmentService)
        {
            this._assignmentService = assignmentService;
        }
        [HttpGet]
        public string getresult()
        {
            return ("ok");
        }

        [HttpPost]
        public IActionResult AssignmentAdd([FromBody] MvAssignment assignment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            try
            {
                var data = _assignmentService.AddAssignment(assignment);
                return Ok(data);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        [HttpGet]
        public IActionResult GetAssignmentDetails()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            try
            {
                var details = _assignmentService.GetAssignmentDetail();
                return Ok(details);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        [HttpPost]
        public IActionResult AssignmentUpdate([FromBody] MvAssignment assignment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            try
            {
                var data = _assignmentService.UpdateAssignment(assignment);
                return Ok(data);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
    }
}
