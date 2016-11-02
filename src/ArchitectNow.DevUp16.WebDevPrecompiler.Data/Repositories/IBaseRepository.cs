using System;
using System.Linq;
using ArchitectNow.DevUp16.WebDevPrecompiler.Data.Models;

namespace ArchitectNow.DevUp16.WebDevPrecompiler.Data.Repositories
{
	public interface IBaseRepository<T> : IDisposable where T : IBaseModel
	{
		T GetOne(Guid id);
		T Save(T item);
		void Delete(T item);
		void Delete(Guid id);
		IQueryable<T> Query { get; }
	}
}
