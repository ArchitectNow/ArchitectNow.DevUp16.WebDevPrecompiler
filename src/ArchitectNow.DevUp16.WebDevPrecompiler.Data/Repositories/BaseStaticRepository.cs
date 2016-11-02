using System;
using System.Collections.Generic;
using System.Linq;
using ArchitectNow.DevUp16.WebDevPrecompiler.Data.Models;

namespace ArchitectNow.DevUp16.WebDevPrecompiler.Data.Repositories
{
	public abstract class BaseStaticRepository<T> : IBaseRepository<T> where T : IBaseModel
	{
		private readonly List<T> _data = new List<T>();

		public List<T> Data => _data;

		public IQueryable<T> Query => _data.AsQueryable();

		public void Delete(Guid id)
		{
			var item = GetOne(id);

			if (item == null)
			{
				throw new ArgumentOutOfRangeException("Item not found");
			}

			_data.Remove(item);
		}

		public void Delete(T item)
		{
			Delete(item.Id);
		}

		public void Dispose()
		{

		}

		public T GetOne(Guid id)
		{
			return _data.FirstOrDefault(x => x.Id == id);
		}

		public T Save(T item)
		{
			//no real implementation on a static repo

			if (GetOne(item.Id) == null)
			{
				_data.Add(item);
			}

			return item;
		}
	}
}
