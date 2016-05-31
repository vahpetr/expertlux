using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace expertlux.Services
{
    public interface IEmailSender
    {
        Task<HttpResponseMessage> SendEmailAsync(string email, string subject, string message);
    }
}
