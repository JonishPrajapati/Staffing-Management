using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using StaffManagement.Application.DataAccess;
using StaffManagement.Application.Model.Address;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;

namespace StaffManagement.Application.Service.Address
{
    public class CustomerService : ICustomerService
    {

        private readonly string _connectionString;
        private DataAccessHelper _dah;

        public CustomerService(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
            if (_connectionString != null)
            {
                _dah = new DataAccessHelper(_connectionString);
            }
        }
        public dynamic AddCustomer(MvCustomer customer)
        {
            var json = JsonConvert.SerializeObject(customer);
            using (var sql = _dah.GetConnection())
            {
                using (SqlCommand command = new SqlCommand("SpCustomerTsk", sql))
                {
                    command.CommandType = (System.Data.CommandType.StoredProcedure); ;
                    command.Parameters.Add(new SqlParameter("@json", json));
                    command.ExecuteNonQuery();
                    return customer;
                }
            }
        }

        public dynamic GetCustomerDetail()
        {
            using (var sql = _dah.GetConnection())
            {
                using (SqlCommand command = new SqlCommand("SpCustomerSel", sql))
                {
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    using (var reader = command.ExecuteReader())
                    {
                        if (reader.HasRows)
                        {
                            Console.WriteLine("Address Detail");
                            return _dah.GetJson(reader);
                        }
                        return null;
                    }
                }
            }
        }

        public dynamic UpdateCustomer(MvCustomer customer)
        {
            var json = JsonConvert.SerializeObject(customer);
            using (var sql = _dah.GetConnection())
            {
                using (SqlCommand command = new SqlCommand("SpCustomerUpd", sql))
                {
                    command.CommandType = (System.Data.CommandType.StoredProcedure); ;
                    command.Parameters.Add(new SqlParameter("@json", json));
                    command.ExecuteNonQuery();
                    return customer;
                }
            }
        }
    }
}
