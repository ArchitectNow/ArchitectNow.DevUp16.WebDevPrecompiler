using ArchitectNow.DevUp16.WebDevPrecompiler.Data.Models;
using ArchitectNow.DevUp16.WebDevPrecompiler.Data.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ArchitectNow.DevUp16.WebDevPrecompiler.API.V1
{
    [Route("api/v1/[controller]/[action]")]
    public class SecurityController : BaseController
    {
        private ISecurityService _securityService;

        public SecurityController(ISecurityService SecurityService)
        {
            this._securityService = SecurityService;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<LoginResult> Login([FromQuery]string UserName, [FromQuery]string Password)
        {
            return await this._securityService.Login(UserName, Password);
        }
    }
}
