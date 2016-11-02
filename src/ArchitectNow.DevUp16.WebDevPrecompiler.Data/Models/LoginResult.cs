namespace ArchitectNow.DevUp16.WebDevPrecompiler.Data.Models
{
	public class LoginResult
	{
		public User CurrentUser { get; set; }

		public string Message { get; set; }
		public bool IsAuthenticated { get; set; }
	}
}
