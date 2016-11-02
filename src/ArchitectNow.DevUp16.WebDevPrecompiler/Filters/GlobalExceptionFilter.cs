using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;

namespace ArchitectNow.DevUp16.WebDevPrecompiler.Filters
{
    public class GlobalExceptionFilter : IExceptionFilter, IDisposable
    {
        private readonly string _env;

        public GlobalExceptionFilter(string env)
        {
            _env = env;
        }

        public void Dispose()
        {

        }

        public void OnException(ExceptionContext context)
        {

            var stackTrace = "No stack trace available";

            if (_env != "Production")
            {
                stackTrace = context.Exception.StackTrace;
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
