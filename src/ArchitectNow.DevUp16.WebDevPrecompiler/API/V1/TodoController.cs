using ArchitectNow.DevUp16.WebDevPrecompiler.Data.Repositories;
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
        private readonly IToDoRepository _toDoRepository;

        public TodoController(IToDoRepository toDoRepository)
        {
            _toDoRepository = toDoRepository;
        }

        [HttpGet]
        [EnsureToken]
        public async Task<List<ToDo>> GetToDos([FromQuery]string filter = "")
        {
            List<ToDo> results;

            if (!string.IsNullOrEmpty(filter))
            {
                results = _toDoRepository.Query.Where(x => x.Title.Contains(filter)).ToList();
            }
            else
            {
                results = _toDoRepository.Query.ToList();
            }

            return await Task.FromResult(results);
        }

        [HttpPost]
        [EnsureToken]
        public async Task<ToDo> UpdateToDo([FromBody]ToDo toDo)
        {
            var result = _toDoRepository.Save(toDo);

            return await Task.FromResult(result);
        }
    }
}
