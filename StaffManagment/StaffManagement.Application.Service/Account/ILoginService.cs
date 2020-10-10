using StaffManagement.Application.Model.Login;
using System;
using System.Collections.Generic;
using System.Text;

namespace StaffManagement.Application.Service.Account
{
    public interface ILoginService
    {
        dynamic GetLogin(MvLogin Login);
    }
}
