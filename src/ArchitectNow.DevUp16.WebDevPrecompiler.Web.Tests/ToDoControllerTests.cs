using System.Linq;
using System.Threading.Tasks;
using ArchitectNow.DevUp16.WebDevPrecompiler.API.V1;
using ArchitectNow.DevUp16.WebDevPrecompiler.Data.Models;
using ArchitectNow.DevUp16.WebDevPrecompiler.Data.Repositories;
using FluentAssertions;
using NSubstitute;
using Xunit;

namespace ArchitectNow.DevUp16.WebDevPrecompiler.Web.Tests
{
    public class ToDoControllerTests : TestBase
    {
	    [Fact]
	    public async Task GetToDos_WithoutFilter_ReturnsList()
	    {
		    var repository = Scope.SubstituteFor<IToDoRepository>();
		    repository.Query.Returns(new[] {new ToDo()}.AsQueryable());
		    var controller = Scope.Resolve<TodoController>();
		    var list = await controller.GetToDos();
		    list.Count.Should().BeGreaterThan(0);
	    }

		[Fact]
		public async Task GetToDos_WithFilter_ReturnsList()
		{
			var repository = Scope.SubstituteFor<IToDoRepository>();
			repository.Query.Returns(new [] { new ToDo { Title = "Foo"}, new ToDo { Title = "Bar" } }.AsQueryable());
			var controller = Scope.Resolve<TodoController>();
			var list = await controller.GetToDos("Bar");
			list.Count.Should().Be(1);
			list.First().Title.Should().Be("Bar");
		}

		[Fact]
		public async Task GetToDos_WithNonMatchingFilter_ReturnsEmptyList()
		{
			var repository = Scope.SubstituteFor<IToDoRepository>();
			repository.Query.Returns(new [] { new ToDo { Title = "Foo" }, new ToDo { Title = "Bar" } }.AsQueryable());
			var controller = Scope.Resolve<TodoController>();
			var list = await controller.GetToDos("hello");
			list.Count.Should().Be(0);
		}
		
	}
}
