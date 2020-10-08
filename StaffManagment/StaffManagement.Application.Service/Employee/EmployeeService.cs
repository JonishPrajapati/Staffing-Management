using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using StaffManagement.Application.DataAccess;
using StaffManagement.Application.Model.Person;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;

namespace StaffManagement.Application.Service.Person
{
    public class EmployeeService : IEmployeeService
    {
        private readonly string _connectionString;
        private DataAccessHelper _dah;

        public EmployeeService(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
            if (_connectionString != null)
            {
                _dah = new DataAccessHelper(_connectionString);
            }
        }
        public dynamic AddEmployee(MvEmployee employee)
        {
            var json = JsonConvert.SerializeObject(employee);
            using (var sql = _dah.GetConnection())
            {
                using (SqlCommand command = new SqlCommand("SpEmployeeTsk", sql))
                {
                    command.CommandType = (System.Data.CommandType.StoredProcedure);
                    command.Parameters.Add(new SqlParameter("@json", json));
                    command.ExecuteNonQuery();
                    return employee;
                }
            }
        }

       

        public dynamic GetEmployeeDetail()
        {
            using (var sql = _dah.GetConnection())
            {
                using (SqlCommand command = new SqlCommand("SpEmployeeSel", sql))
                {
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    using (var reader = command.ExecuteReader())
                    {
                        if (reader.HasRows)
                        {
                            Console.WriteLine("Person Detail");
                            return _dah.GetJson(reader);
                        }
                        return null;
                    }
                }
            }
        }

        public dynamic UpdateEmployee(MvEmployee employee)
        {
            var json = JsonConvert.SerializeObject(employee);
            using (var sql = _dah.GetConnection())
            {
                using (SqlCommand command = new SqlCommand("SpPersonUpdTsk", sql))
                {
                    command.CommandType = (System.Data.CommandType.StoredProcedure); ;
                    command.Parameters.Add(new SqlParameter("@json", json));
                    command.ExecuteNonQuery();
                    return employee;
                }
            }
        }

    }
}
