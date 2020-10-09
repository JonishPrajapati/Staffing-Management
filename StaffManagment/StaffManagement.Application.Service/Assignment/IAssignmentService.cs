using StaffManagement.Application.Model.Assignment;
using System;
using System.Collections.Generic;
using System.Text;

namespace StaffManagement.Application.Service.Assignment
{
    public interface IAssignmentService
    {
        dynamic AddAssignment(MvAssignment assignment);
        dynamic GetAssignmentDetail();
        dynamic UpdateAssignment(MvAssignment assignment);
    }
}
