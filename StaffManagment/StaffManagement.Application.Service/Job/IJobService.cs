using StaffManagement.Application.Model.Job;
using System;
using System.Collections.Generic;
using System.Text;

namespace StaffManagement.Application.Service.Job
{
    public interface IJobService
    {
        dynamic AddJob(MvJob job);
        dynamic GetJobDetail();
        dynamic UpdateJob(MvJob job);
    }
}
