using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using StaffManagement.Application.DataAccess;
using StaffManagement.Application.Model.Transaction;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;

namespace StaffManagement.Application.Service.Transaction
{
    public class TransactionService : ITransactionService
    {
        private readonly string _connectionString;
        private DataAccessHelper _dah;

        public TransactionService(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
            if (_connectionString != null)
            {
                _dah = new DataAccessHelper(_connectionString);
            }
        }
        public dynamic AddTransaction(IEnumerable<MvTransaction> transaction)
        {
            var json = JsonConvert.SerializeObject(transaction);
            using (var sql = _dah.GetConnection())
            {
                using (SqlCommand command = new SqlCommand("SpTransactionIns", sql))
                {
                    command.CommandType = (System.Data.CommandType.StoredProcedure);
                    command.Parameters.Add(new SqlParameter("@json", json));
                    command.ExecuteNonQuery();
                    return transaction;
                }
            }
        }

        public dynamic GetTransactionDetail()
        {
            using (var sql = _dah.GetConnection())
            {
                using (SqlCommand command = new SqlCommand("SpTransactionSel", sql))
                {
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    using (var reader = command.ExecuteReader())
                    {
                        if (reader.HasRows)
                        {
                            Console.WriteLine("Transaction Detail");
                            return _dah.GetJson(reader);
                        }
                        return null;
                    }
                }
            }
        }

        public dynamic UpdateTransaction(MvTransaction transaction)
        {
            var json = JsonConvert.SerializeObject(transaction);
            using (var sql = _dah.GetConnection())
            {
                using (SqlCommand command = new SqlCommand("SpTransactionUpd", sql))
                {
                    command.CommandType = (System.Data.CommandType.StoredProcedure); ;
                    command.Parameters.Add(new SqlParameter("@json", json));
                    command.ExecuteNonQuery();
                    return transaction;
                }
            }
        }
    }
}
