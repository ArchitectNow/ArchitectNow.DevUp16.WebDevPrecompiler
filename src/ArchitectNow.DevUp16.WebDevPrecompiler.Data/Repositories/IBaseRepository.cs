using ArchitectNow.DevUp16.WebDevPrecompiler.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArchitectNow.DevUp16.WebDevPrecompiler.Data.Repositories
{
    public interface IBaseRepository<T> : IDisposable where T : IBaseModel
    {
        T GetOne(Guid Id);
        T Save(T Item);
        void Delete(T Item);
        void Delete(Guid Id);
        IQueryable<T> Query { get; }
    }
}
