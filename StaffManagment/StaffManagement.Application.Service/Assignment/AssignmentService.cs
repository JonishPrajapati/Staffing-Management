using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using StaffManagement.Application.DataAccess;
using StaffManagement.Application.Model.Assignment;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;

namespace StaffManagement.Application.Service.Assignment
{
    public class AssignmentService : IAssignmentService
    {

        private readonly string _connectionString;
        private DataAccessHelper _dah;

        public AssignmentService(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
            if (_connectionString != null)
            {
                _dah = new DataAccessHelper(_connectionString);
            }
        }
        public dynamic AddAssignment(MvAssignment assignment)
        {
            var json = JsonConvert.SerializeObject(assignment);
            using (var sql = _dah.GetConnection())
            {
                using (SqlCommand command = new SqlCommand("SpAssignmentIns", sql))
                {
                    command.CommandType = (System.Data.CommandType.StoredProcedure); ;
                    command.Parameters.Add(new SqlParameter("@json", json));
                    command.ExecuteNonQuery();
                    return assignment;
                }
            }
        }

        public dynamic GetAssignmentDetail()
        {
            using (var sql = _dah.GetConnection())
            {
                using (SqlCommand command = new SqlCommand("SpAssignmentSel", sql))
                {
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    using (var reader = command.ExecuteReader())
                    {
                        if (reader.HasRows)
                        {
                            Console.WriteLine("Assignment Detail");
                            return _dah.GetJson(reader);
                        }
                        return null;
                    }
                }
            }
        }

        public dynamic UpdateAssignment(MvAssignment assignment)
        {
            var json = JsonConvert.SerializeObject(assignment);
            using (var sql = _dah.GetConnection())
            {
                using (SqlCommand command = new SqlCommand("SpAssignmentUpd", sql))
                {
                    command.CommandType = (System.Data.CommandType.StoredProcedure); ;
                    command.Parameters.Add(new SqlParameter("@json", json));
                    command.ExecuteNonQuery();
                    return assignment;
                }
            }
        }
    }
}
