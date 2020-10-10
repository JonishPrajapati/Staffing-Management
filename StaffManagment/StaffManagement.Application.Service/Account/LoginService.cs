using Microsoft.Extensions.Configuration;
using StaffManagement.Application.DataAccess;
using StaffManagement.Application.Model.Login;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;

namespace StaffManagement.Application.Service.Account
{
    public class LoginService : ILoginService
    {
        private readonly string _connectionString;
        private DataAccessHelper _dah;

        public LoginService(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
            if (_connectionString != null)
            {
                _dah = new DataAccessHelper(_connectionString);
            }
        }

        public dynamic GetLogin(MvLogin login)
        {


            using (var sql = _dah.GetConnection())
            {
                using (SqlCommand command = new SqlCommand("SpUserLoginCheck", sql))
                {
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.Parameters.Add(new SqlParameter("@UserName", login.username));
                    command.Parameters.Add(new SqlParameter("@Password", login.password));


                    using (var reader = command.ExecuteReader())
                    {
                        if (reader.HasRows)
                        {
                            Console.WriteLine("user Exist");
                            return _dah.GetJson(reader);
                        }
                        return null;
                    }
                }
            }
        }

    }
}
