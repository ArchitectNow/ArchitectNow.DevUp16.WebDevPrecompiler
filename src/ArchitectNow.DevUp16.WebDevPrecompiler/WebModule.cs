using Autofac;

namespace ArchitectNow.DevUp16.WebDevPrecompiler
{
    public class WebModule : Module
    {
	    protected override void Load(ContainerBuilder builder)
	    {
            // Register dependencies, populate the services from
            // the collection, and build the container. If you want
            // to dispose of the container at the end of the app,
            // be sure to keep a reference to it as a property or field.
            //builder.RegisterType<MyType>().As<IMyType>();
        }
    }
}
