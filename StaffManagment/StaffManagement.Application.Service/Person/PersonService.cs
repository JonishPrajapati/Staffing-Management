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
    public class PersonService : IPersonService
    {
        private readonly string _connectionString;
        private DataAccessHelper _dah;

        public PersonService(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
            if (_connectionString != null)
            {
                _dah = new DataAccessHelper(_connectionString);
            }
        }
        public dynamic AddPerson(MvPerson person)
        {
            var json = JsonConvert.SerializeObject(person);
            using (var sql = _dah.GetConnection())
            {
                using (SqlCommand command = new SqlCommand("SpPersonIns", sql))
                {
                    command.CommandType = (System.Data.CommandType.StoredProcedure); ;
                    command.Parameters.Add(new SqlParameter("@json", json));
                    command.ExecuteNonQuery();
                    return person;
                }
            }
        }

        public dynamic GetPersonDetail()
        {
            using (var sql = _dah.GetConnection())
            {
                using (SqlCommand command = new SqlCommand("SpPersonSel", sql))
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

        public dynamic UpdatePerson(MvPerson person)
        {
            var json = JsonConvert.SerializeObject(person);
            using (var sql = _dah.GetConnection())
            {
                using (SqlCommand command = new SqlCommand("SpPersonUpd", sql))
                {
                    command.CommandType = (System.Data.CommandType.StoredProcedure); ;
                    command.Parameters.Add(new SqlParameter("@json", json));
                    command.ExecuteNonQuery();
                    return person;
                }
            }
        }
    }
}
