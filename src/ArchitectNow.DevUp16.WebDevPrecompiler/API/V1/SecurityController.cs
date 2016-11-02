using ArchitectNow.DevUp16.WebDevPrecompiler.API.V1.Models;
using ArchitectNow.DevUp16.WebDevPrecompiler.Data.Models;
using ArchitectNow.DevUp16.WebDevPrecompiler.Data.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace ArchitectNow.DevUp16.WebDevPrecompiler.API.V1
{
    [Route("api/v1/[controller]/[action]")]
    public class SecurityController : BaseController
    {
        private readonly ISecurityService _securityService;

        public SecurityController(ISecurityService securityService)
        {
            _securityService = securityService;
        }

        [HttpPost]
        [AllowAnonymous]
        [ExpandParameters]
        public async Task<LoginResult> Login([FromBody]LoginParameters parameters)
        {
            if (parameters==null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }

            return await _securityService.Login(parameters.UserName, parameters.Password);
        }
    }
}
