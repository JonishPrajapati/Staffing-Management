using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
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
                    command.Parameters.Add(new SqlParameter("@UserName", login.Username));
                    command.Parameters.Add(new SqlParameter("@Password", login.Password));


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

        public dynamic GetDetails(string json)
        {
            var jsonNew = JsonConvert.DeserializeObject(json);
            using (var sql = _dah.GetConnection())
            {
                using (SqlCommand command = new SqlCommand("SpUserLoginSelByUser", sql))
                {
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.Parameters.Add(new SqlParameter("@json", jsonNew.ToString()));
                    using (var reader = command.ExecuteReader())
                    {
                        if (reader.HasRows)
                        {
                            Console.WriteLine("user Detail");
                            return _dah.GetJson(reader);
                        }
                        return null;
                    }
                }
            }
        }

        public dynamic AllDetails()
        {
            using (var sql = _dah.GetConnection())
            {
                using (SqlCommand command = new SqlCommand("SpUserLoginSelAllUser", sql))
                {
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    using (var reader = command.ExecuteReader())
                    {
                        if (reader.HasRows)
                        {
                            Console.WriteLine("user Detail");
                            return _dah.GetJson(reader);
                        }
                        return null;
                    }
                }
            }
        }

    }
}
