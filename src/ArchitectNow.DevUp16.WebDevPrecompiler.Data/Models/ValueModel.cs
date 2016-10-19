using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArchitectNow.DevUp16.WebDevPrecompiler.Data.Models
{
    public class ValueModel : BaseModel 
    {
        public ValueModel()
        {

        }

        public string Name { get; set; }
        public string Description { get; set; }
    }
}
