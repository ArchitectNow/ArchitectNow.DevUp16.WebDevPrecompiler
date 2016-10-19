using ArchitectNow.DevUp16.WebDevPrecompiler.Data.Repositories;
using ArchitectNow.DevUp16.WebDevPrecompiler.Data.Services;
using Autofac;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArchitectNow.DevUp16.WebDevPrecompiler.Data
{
    public static class AutofacConfig
    {
        public static void ConfigureContainer(ContainerBuilder Builder)
        {
            // Register dependencies, populate the services from
            // the collection, and build the container. If you want
            // to dispose of the container at the end of the app,
            // be sure to keep a reference to it as a property or field.

            Builder.RegisterType<ToDoRepository>().As<IToDoRepository>();
            Builder.RegisterType<SecurityService>().As<ISecurityService>();

        }
    }
}
