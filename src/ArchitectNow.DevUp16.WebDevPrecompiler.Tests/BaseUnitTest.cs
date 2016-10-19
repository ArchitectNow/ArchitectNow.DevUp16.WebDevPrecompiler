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

        }

        [ClassInitialize]
        public void InitializeContainer()
        {
            //var builder = new ContainerBuilder();

            //ArchitectNow.DevUp16.WebDevPrecompiler.AutofacConfig.ConfigureContainer(builder);
            //Data.AutofacConfig.ConfigureContainer(builder);

            //Container = builder.Build();
        }
    }
}
