using ArchitectNow.DevUp16.WebDevPrecompiler.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArchitectNow.DevUp16.WebDevPrecompiler.Data.Repositories
{
    public abstract class BaseStaticRepository<T> : IBaseRepository<T> where T : IBaseModel
    {
        private List<T> _data = new List<T>();


        public IQueryable<T> Query
        {
            get
            {
                return _data.AsQueryable();
            }
        }

        public void Delete(Guid Id)
        {
            var _item = GetOne(Id);

            if (_item == null)
            {
                throw new ArgumentOutOfRangeException("Item not found");
            }

            _data.Remove(_item);
        }

        public void Delete(T Item)
        {
            Delete(Item.Id);
        }

        public void Dispose()
        {

        }

        public T GetOne(Guid Id)
        {
            return _data.FirstOrDefault(x => x.Id == Id);
        }

        public T Save(T Item)
        {
            //no real implementation on a static repo

            if (GetOne(Item.Id) == null)
            {
                _data.Add(Item);
            }

            return Item;
        }
    }
}
