using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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

            var _tokenData = context.HttpContext.Request.Headers["securityToken"];

            if (string.IsNullOrEmpty(_tokenData))
            {
                context.Result = new UnauthorizedResult();
            }

        }

        public void OnResourceExecuted(ResourceExecutedContext context)
        {

        }


    }
}
