using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Autofac;
using ArchitectNow.DevUp16.WebDevPrecompiler.Data.Services;

namespace ArchitectNow.DevUp16.WebDevPrecompiler.Tests.ServiceTests
{
    [TestClass]
    public class SecurityServiceTests : BaseUnitTest
    {
        public SecurityServiceTests()
        {

        }

        [TestMethod]
        [TestCategory("Services")]
        public void BadLoginTests()
        {
            var _securityService = this.Container.Resolve<ISecurityService>();

            var _task = _securityService.Login("bad", "data");

            _task.Wait();

            var _result = _task.Result;

            Assert.IsNull(_result.CurrentUser);
            Assert.IsFalse(_result.IsAuthenticated);
        }
    }
}
