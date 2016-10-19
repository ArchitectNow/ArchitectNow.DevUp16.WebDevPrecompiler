using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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

            var _tokenData = context.HttpContext.Request.Headers["securityToken"];

            if (string.IsNullOrEmpty(_tokenData))
            {
                return;
            }

            try
            {
                this.SecurityToken = _tokenData;
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Error configuring base service: " + ex.Message);
            }

            base.OnActionExecuting(context);
        }

    }
}
