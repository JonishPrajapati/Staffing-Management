using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace StaffManagement.Application.Model.Person
{
    public class MvEmployee
    {
        public int employeeId { get; set; }
        [Required]
        public string firstName { get; set; }
        [Required]
        public string lastName { get; set; }
        [Required]
        public string middleName { get; set; }
        [Required]
        public string gender { get; set; }
        [Required]
        public string country { get; set; }
        [Required]
        public int province { get; set; }
        [Required]
        public string state { get; set; }
        [Required]
        public string phone { get; set; }
        [Required]
        public string email { get; set; }
        [Required]
        public string telephone { get; set; }


    }
}
