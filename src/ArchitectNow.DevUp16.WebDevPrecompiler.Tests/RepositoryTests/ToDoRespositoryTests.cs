using System;
using System.Text;
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ArchitectNow.DevUp16.WebDevPrecompiler.Data.Repositories;
using ArchitectNow.DevUp16.WebDevPrecompiler.Data.Models;
using Autofac;

namespace ArchitectNow.DevUp16.WebDevPrecompiler.Tests.RepositoryTests
{
    /// <summary>
    /// Summary description for ValueRepositoryTests
    /// </summary>
    [TestClass]
    public class ToDoRespositoryTests : BaseUnitTest
    {
        public ToDoRespositoryTests()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        [TestMethod]
        [TestCategory("Repository")]
        public void GetValueBadId()
        {
            var _repo = this.Container.Resolve<IToDoRepository>();

            var _results = _repo.GetOne(Guid.NewGuid());

            Assert.IsNull(_results);
        }

        [TestMethod]
        [TestCategory("Repository")]
        public void CreateNewValue()
        {
            var _repo = this.Container.Resolve<IToDoRepository>();

            var _newValue = new ToDo();
            _newValue.Title = "Test";
            _newValue.Id = Guid.NewGuid();

            _repo.Save(_newValue);

            var _result = _repo.GetOne(_newValue.Id);

            Assert.IsNotNull(_result);

        
        }
    }
}
