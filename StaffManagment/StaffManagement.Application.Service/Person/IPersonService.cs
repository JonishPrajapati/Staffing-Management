using StaffManagement.Application.Model.Person;
using System;
using System.Collections.Generic;
using System.Text;

namespace StaffManagement.Application.Service.Person
{
   public interface IPersonService
    {
        dynamic AddPerson(MvPerson person);
        dynamic GetPersonDetail();
        dynamic UpdatePerson(MvPerson person);
    }
}
