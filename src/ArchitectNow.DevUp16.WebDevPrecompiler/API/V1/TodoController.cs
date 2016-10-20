using ArchitectNow.DevUp16.WebDevPrecompiler.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ArchitectNow.DevUp16.WebDevPrecompiler.Data.Models;
using Microsoft.AspNetCore.Mvc;
using ArchitectNow.DevUp16.WebDevPrecompiler.Filters;

namespace ArchitectNow.DevUp16.WebDevPrecompiler.API.V1
{
    [Route("api/v1/[controller]/[action]")]
    
    public class TodoController : BaseController
    {
        private IToDoRepository _toDoRepository;

        public TodoController(IToDoRepository ToDoRepository)
        {
            this._toDoRepository = ToDoRepository;
        }

        [HttpGet]
        [EnsureToken]
        public async Task<List<ToDo>> GetToDos([FromQuery]string Filter = "")
        {
            List<ToDo> _results;

            if (!string.IsNullOrEmpty(Filter))
            {
                _results = _toDoRepository.Query.Where(x => x.Title.Contains(Filter)).ToList();
            }
            else
            {
                _results = _toDoRepository.Query.ToList();
            }

            return _results;
        }

        [HttpPost]
        [EnsureToken]
        public async Task<ToDo> UpdateToDo([FromBody]ToDo ToDo)
        {
            var _result = _toDoRepository.Save(ToDo);

            return _result;
        }
    }
}
