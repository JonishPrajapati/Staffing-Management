using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;

namespace StaffManagement.Application.DataAccess
{
    public class DataAccessHelper
    {
        private readonly string _connectionString;
        private SqlConnection _connection;

        public DataAccessHelper(string connectionString)
        {
            _connectionString = connectionString;
        }

        public SqlConnection GetConnection()
        {
            try
            {
                SetConnection();
                return _connection;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        private void SetConnection()
        {
            _connection = new SqlConnection(_connectionString);
            if (_connection.State == System.Data.ConnectionState.Closed)
            {
                _connection.Open();
            }
            else
            {
                _connection.Close();
                _connection.Open();
            }
        }
        public dynamic GetJson(SqlDataReader reader)
        {
            var dataTable = new System.Data.DataTable();
            dataTable.Load(reader);

            if (dataTable.Rows[0] != null && dataTable.Rows[0]["Json"].ToString() != null)
            {
                return JsonConvert.DeserializeObject(dataTable.Rows[0]["Json"].ToString());
            }
            return null;

        }

    }
}
