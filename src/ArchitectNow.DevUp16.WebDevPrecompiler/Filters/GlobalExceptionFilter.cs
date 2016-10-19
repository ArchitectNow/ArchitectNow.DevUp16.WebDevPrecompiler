using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ArchitectNow.DevUp16.WebDevPrecompiler.Filters
{
    public class GlobalExceptionFilter : IExceptionFilter, IDisposable
    {
        private string _env = "Development";

        public GlobalExceptionFilter(string Env)
        {
            _env = Env;
        }

        public void Dispose()
        {

        }

        public void OnException(ExceptionContext context)
        {

            var _stackTrace = "No stack trace available";

            if (_env != "Production")
            {
                _stackTrace = context.Exception.StackTrace;
            }

            var response = new
            {
                Message = context.Exception.Message,
                StackTrace = context.Exception.StackTrace
            };

            context.Result = new ObjectResult(response)
            {
                StatusCode = 500
            };
        }
    }
}
