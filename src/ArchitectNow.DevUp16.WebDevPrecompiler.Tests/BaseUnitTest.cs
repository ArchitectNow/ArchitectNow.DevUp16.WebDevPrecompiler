using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Autofac;

namespace ArchitectNow.DevUp16.WebDevPrecompiler.Tests
{
    public abstract class BaseUnitTest
    {
        public IContainer Container { get; set; }

        public BaseUnitTest()
        {
            var builder = new ContainerBuilder();

            Data.AutofacConfig.ConfigureContainer(builder);

            Container = builder.Build();
        }

        [ClassInitialize]
        public void InitializeContainer()
        {

        }
    }
}
