using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;

namespace ArchitectNow.DevUp16.WebDevPrecompiler.API
{
    public class BaseController : Controller
    {
        public string SecurityToken { get; private set; }

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (!context.HttpContext.Request.Headers.ContainsKey("securityToken"))
            {
                return;
            }

            var tokenData = context.HttpContext.Request.Headers["securityToken"];

            if (string.IsNullOrEmpty(tokenData))
            {
                return;
            }

            try
            {
                SecurityToken = tokenData;
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Error configuring base service: " + ex.Message);
            }
        }

    }
}
