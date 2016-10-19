using ArchitectNow.DevUp16.WebDevPrecompiler.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArchitectNow.DevUp16.WebDevPrecompiler.Data.Services
{
    public class SecurityService : ISecurityService
    {
        public SecurityService()
        {

        }

        public async Task<LoginResult> Login(string UserName, string Password)
        {
            if (string.IsNullOrEmpty(UserName))
            {
                throw new ArgumentNullException(nameof(UserName));
            }

            if (string.IsNullOrEmpty(Password))
            {
                throw new ArgumentNullException(nameof(Password));
            }

            if (UserName == "hello" && Password == "world")
            {
                var _user = new User();
                _user.UserName = UserName;

                return await Task.FromResult(new Models.LoginResult() { CurrentUser = _user, IsAuthenticated = true });
            }
            else
            {
                return await Task.FromResult(new LoginResult() { IsAuthenticated = false, Message = "Invalid credentials" });
            }
        }
    }
}
