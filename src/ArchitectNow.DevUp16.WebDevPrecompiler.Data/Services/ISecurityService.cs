using System.Threading.Tasks;
using ArchitectNow.DevUp16.WebDevPrecompiler.Data.Models;

namespace ArchitectNow.DevUp16.WebDevPrecompiler.Data.Services
{
    public interface ISecurityService
    {
        Task<LoginResult> Login(string UserName, string Password);
    }
}