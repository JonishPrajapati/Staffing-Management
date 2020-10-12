using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace StaffManagement.Application.Model.Assignment
{
   public class MvAssignment
    {
        public int assignmentId { get; set; }
        [Required]
        public string assignmentName { get; set; }
        [Required]
        public int employeeId { get; set; }
        [Required]
        public int jobId { get; set; }
        [Required]
        public string status { get; set; }
        [Required]
        public int unit { get; set; }
        [Required]
        public int rate { get; set; }
    }
}
