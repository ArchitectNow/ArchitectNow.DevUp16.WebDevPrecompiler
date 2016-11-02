using ArchitectNow.DevUp16.WebDevPrecompiler.Data.Models;
using ArchitectNow.DevUp16.WebDevPrecompiler.Data.Repositories;
using ArchitectNow.DevUp16.WebDevPrecompiler.Data.Services;
using Autofac;

namespace ArchitectNow.DevUp16.WebDevPrecompiler.Data
{
	public class DataModule : Module
	{
		protected override void Load(ContainerBuilder builder)
		{
			// Register dependencies, populate the services from
			// the collection, and build the container. If you want
			// to dispose of the container at the end of the app,
			// be sure to keep a reference to it as a property or field.

			var dummyRepo = new ToDoRepository();

			for (int i = 0; i < 10; i++)
			{
				dummyRepo.Data.Add(new ToDo { Title = "ToDo-" + i, IsClosed = i > 5 });
			}

			builder.Register(x => dummyRepo).As<IToDoRepository>();

			builder.RegisterType<SecurityService>().As<ISecurityService>();

		}
	}
}
