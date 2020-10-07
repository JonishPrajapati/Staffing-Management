using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace StaffManagement.Application.Model.Person
{
    public class MvPerson
    {
        public int personId { get; set; }
        [Required]
        public string firstName { get; set; }
        [Required]
        public string lastName { get; set; }
        [Required]
        public string middleName { get; set; }
        [Required]
        public string gender { get; set; }

    }
}
