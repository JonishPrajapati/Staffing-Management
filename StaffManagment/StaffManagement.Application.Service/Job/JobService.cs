using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using StaffManagement.Application.DataAccess;
using StaffManagement.Application.Model.Job;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;

namespace StaffManagement.Application.Service.Job
{
    public class JobService : IJobService
    {
        private readonly string _connectionString;
        private DataAccessHelper _dah;

        public JobService(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
            if (_connectionString != null)
            {
                _dah = new DataAccessHelper(_connectionString);
            }
        }
        public dynamic AddJob(MvJob job)
        {
            var json = JsonConvert.SerializeObject(job);
            using (var sql = _dah.GetConnection())
            {
                using (SqlCommand command = new SqlCommand("SpJobIns", sql))
                {
                    command.CommandType = (System.Data.CommandType.StoredProcedure);
                    command.Parameters.Add(new SqlParameter("@json", json));
                    command.ExecuteNonQuery();
                    return job;
                }
            }
        }

        public dynamic GetJobDetail()
        {
            using (var sql = _dah.GetConnection())
            {
                using (SqlCommand command = new SqlCommand("SpJobSel", sql))
                {
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    using (var reader = command.ExecuteReader())
                    {
                        if (reader.HasRows)
                        {
                            Console.WriteLine("Job Detail");
                            return _dah.GetJson(reader);
                        }
                        return null;
                    }
                }
            }
        }

        public dynamic UpdateJob(MvJob job)
        {
            var json = JsonConvert.SerializeObject(job);
            using (var sql = _dah.GetConnection())
            {
                using (SqlCommand command = new SqlCommand("SpJobUpd", sql))
                {
                    command.CommandType = (System.Data.CommandType.StoredProcedure); ;
                    command.Parameters.Add(new SqlParameter("@json", json));
                    command.ExecuteNonQuery();
                    return job;
                }
            }
            throw new NotImplementedException();
        }
    }
}
