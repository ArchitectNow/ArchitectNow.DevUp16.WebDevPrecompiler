using System;
using System.Linq;
using Autofac;
using AutofacContrib.NSubstitute;

namespace ArchitectNow.DevUp16.WebDevPrecompiler.Web.Tests
{
    public abstract class TestBase
    {
		protected AutoSubstitute Scope { get; private set; }
	    protected TestBase()
	    {
		    var autoSubstitute = new AutoSubstitute();
			
		    //var builder = new ContainerBuilder();
		    //var assemblies = AppDomain.CurrentDomain.GetAssemblies().Where(assembly => assembly.FullName.StartsWith("ArchitectNow.DevUp16"));
		    //builder.RegisterAssemblyModules(assemblies.ToArray());

		    //var container = builder.Build();
		    Scope = autoSubstitute;
	    }

		private bool _disposed;

		public void Dispose()
		{
			Dispose(true);
			GC.SuppressFinalize(this);
		}

		private void Dispose(bool disposing)
		{
			if (!_disposed)
			{
				if (disposing)
				{
					// cleanup code goes here
				}
				_disposed = true;
			}
		}

		~TestBase()
		{
			Dispose(false);
		}
	}
}
