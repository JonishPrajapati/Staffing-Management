using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace StaffManagement.Application.Model.Job
{
    public class MvJob
    {
        public int jobId { get; set; }
        [Required]
        public string designation { get; set; }
        [Required]
        public int customerId { get; set; }
    }
}
