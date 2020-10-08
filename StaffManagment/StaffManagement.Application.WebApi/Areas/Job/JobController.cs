using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using StaffManagement.Application.Model.Job;
using StaffManagement.Application.Service.Job;
using StaffManagement.Application.WebApi.Areas.Base;

namespace StaffManagement.Application.WebApi.Areas.Job
{
    public class JobController : BaseController
    {
        private IJobService _jobService;

        public JobController(IJobService jobService)
        {
            this._jobService = jobService;
        }
        [HttpPost]
        public IActionResult JobAdd([FromBody] MvJob job)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            try
            {
                var data = _jobService.AddJob(job);
                return Ok(data);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        [HttpGet]
        public IActionResult GetJobDetails()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            try
            {
                var details = _jobService.GetJobDetail();
                return Ok(details);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        [HttpPost]
        public IActionResult JobUpdate([FromBody] MvJob job)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            try
            {
                var data = _jobService.UpdateJob(job);
                return Ok(data);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
    }
}
