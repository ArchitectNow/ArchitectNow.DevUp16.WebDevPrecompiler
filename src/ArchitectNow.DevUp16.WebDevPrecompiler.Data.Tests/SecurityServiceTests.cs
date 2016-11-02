using System;
using System.Threading.Tasks;
using ArchitectNow.DevUp16.WebDevPrecompiler.Data.Services;
using FluentAssertions;
using Xunit;

namespace ArchitectNow.DevUp16.WebDevPrecompiler.Data.Tests
{
	public class SecurityServiceTests : TestBase
	{
		[Fact]
		public async Task Login_WithInvalidValidUserNamePassword_ReturnsLoginResult()
		{
			var service = Scope.Resolve<SecurityService>();

			var result = await service.Login("test", "password");

			result.Should().NotBeNull();
			result.IsAuthenticated.Should().BeFalse();
		}


		[Fact]
		public async Task Login_WithValidUserNamePassword_ReturnsLoginResult()
		{
			var service = Scope.Resolve<SecurityService>();

			var result = await service.Login("hello", "world");

			result.Should().NotBeNull();
			result.IsAuthenticated.Should().BeTrue();
		}

		[Fact]
		public async Task Login_WithMissingUsername_Throws()
		{
			var service = Scope.Resolve<SecurityService>();

			service.Awaiting(async ss => await ss.Login(null, "world")).ShouldThrow<ArgumentNullException>();
		}

		[Fact]
		public async Task Login_WithMissingPassword_Throws()
		{
			var service = Scope.Resolve<SecurityService>();

			service.Awaiting(async ss => await ss.Login("hello", null)).ShouldThrow<ArgumentNullException>();

		}
	}

}
