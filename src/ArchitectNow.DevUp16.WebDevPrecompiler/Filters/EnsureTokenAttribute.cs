using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;

namespace ArchitectNow.DevUp16.WebDevPrecompiler.Filters
{
    public class EnsureTokenAttribute : Attribute, IResourceFilter
    {
        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            if (!context.HttpContext.Request.Headers.ContainsKey("securityToken"))
            {
                context.Result = new UnauthorizedResult();
            }

            var tokenData = context.HttpContext.Request.Headers["securityToken"];

            if (string.IsNullOrEmpty(tokenData))
            {
                context.Result = new UnauthorizedResult();
            }

        }

        public void OnResourceExecuted(ResourceExecutedContext context)
        {

        }


    }
}
