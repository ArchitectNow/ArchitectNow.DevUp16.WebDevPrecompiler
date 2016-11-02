using System;

namespace ArchitectNow.DevUp16.WebDevPrecompiler.Data.Models
{
	public class BaseModel : IBaseModel
	{
		public BaseModel()
		{
			Id = Guid.NewGuid();
		}

		public Guid Id { get; set; }
	}
}
