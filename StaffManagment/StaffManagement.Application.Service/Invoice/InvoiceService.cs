using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using StaffManagement.Application.DataAccess;
using StaffManagement.Application.Model.Invoice;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;

namespace StaffManagement.Application.Service.Invoice
{
    public class InvoiceService : IInvoiceService
    {

        private readonly string _connectionString;
        private DataAccessHelper _dah;

        public InvoiceService(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
            if (_connectionString != null)
            {
                _dah = new DataAccessHelper(_connectionString);
            }
        }
        public dynamic AddInvoice(IEnumerable<MvInvoice> invoice)
        {
            var json = JsonConvert.SerializeObject(invoice);
            using (var sql = _dah.GetConnection())
            {
                using (SqlCommand command = new SqlCommand("SpInvoiceIns", sql))
                {
                    command.CommandType = (System.Data.CommandType.StoredProcedure);
                    command.Parameters.Add(new SqlParameter("@json", json));
                    command.ExecuteNonQuery();
                    return invoice;
                }
            }
        }

        public dynamic GetInvoiceDetail()
        {
            using (var sql = _dah.GetConnection())
            {
                using (SqlCommand command = new SqlCommand("SpInvoiceSel", sql))
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

        public dynamic GetSingleInvoiceDetails(MvInvoice invoice)
        {
            var jsonConvert = JsonConvert.SerializeObject(invoice);
            using (var sql = _dah.GetConnection())
            {
                using (SqlCommand command = new SqlCommand("SpInvoiceSelOneUser", sql))
                {
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.Parameters.Add(new SqlParameter("@json", jsonConvert));
                    using (var reader = command.ExecuteReader())
                    {
                        if (reader.HasRows)
                        {
                            Console.WriteLine("invoice Detail");
                            return _dah.GetJson(reader);
                        }
                        return null;
                    }
                }
            }
        }
    }
}
