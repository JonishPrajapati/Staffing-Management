using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace StaffManagement.Application.Model.Address
{
    public class MvCustomer
    {
        public int organizationId { get; set; }
        [Required]
        public string organizationName { get; set; }
        [Required]
        public string organizationCategory { get; set; }
        [Required]
        public string organizationDescription { get; set;}
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
