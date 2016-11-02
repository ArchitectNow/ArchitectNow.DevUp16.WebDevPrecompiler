using System;
using System.Threading.Tasks;
using ArchitectNow.DevUp16.WebDevPrecompiler.Data.Models;

namespace ArchitectNow.DevUp16.WebDevPrecompiler.Data.Services
{
	class SecurityService : ISecurityService
	{
		public async Task<LoginResult> Login(string userName, string password)
		{
			if (string.IsNullOrEmpty(userName))
			{
				throw new ArgumentNullException(nameof(userName));
			}

			if (string.IsNullOrEmpty(password))
			{
				throw new ArgumentNullException(nameof(password));
			}

			if (userName == "hello" && password == "world")
			{
				var user = new User { UserName = userName };

				return await Task.FromResult(new LoginResult { CurrentUser = user, IsAuthenticated = true });
			}
			return await Task.FromResult(new LoginResult { IsAuthenticated = false, Message = "Invalid credentials" });
		}
	}
}
