using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Collections.Generic;
using Newtonsoft.Json;
using System.Linq;
using System.Net;
using System.Net.Http.Headers;
using System.Text;
using Microsoft.Extensions.Configuration;

namespace expertlux.Services
{
    // This class is used by the application to send Email and SMS
    // when you turn on two-factor authentication in ASP.NET Identity.
    // For more details see this link http://go.microsoft.com/fwlink/?LinkID=532713
    public class AuthMessageSender : IEmailSender, ISmsSender
    {
        // the domain name you have verified in your Mailgun account
        readonly string domain;
        readonly string token;
        
        public AuthMessageSender(IConfigurationRoot configuration) {
            domain = configuration["mailgun:domain"];
            var apiKey = configuration["mailgun:apiKey"];
            token = Convert.ToBase64String(UTF8Encoding.UTF8.GetBytes("api" + ":" + apiKey));
        }
        
        //https://www.talksharp.com/aspnetcore-mailgun
        public async Task<HttpResponseMessage> SendEmailAsync(string email, string subject, string message)
        {
            var client = new HttpClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", token);

            var form = new Dictionary<string, string>();
            form["from"] = "Mailgun Sandbox <postmaster@" + domain + ">";
            form["to"] = email;
            form["subject"] = subject;
            form["text"] = message;
            
            var context = new FormUrlEncodedContent(form);
            var responce = await client.PostAsync("https://api.mailgun.net/v3/" + domain + "/messages", context);
            return responce;
        }

        public Task SendSmsAsync(string number, string message)
        {
            // Plug in your SMS service here to send a text message.
            return Task.FromResult(0);
        }
        
    }
}
