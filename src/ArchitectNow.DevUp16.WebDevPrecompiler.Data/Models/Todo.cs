using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArchitectNow.DevUp16.WebDevPrecompiler.Data.Models
{
    public class ToDo : BaseModel
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string ToDoType { get; set; }
        public bool IsClosed { get; set; }
        public DateTime ClosedDate { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
