using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using KitanoApplication.DataAccess;

namespace KitanoApplication.Controllers
{
    public class AuditCycleController : BaseController
    {
        public AuditCycleController(IConfiguration config, ITokenService tokenService) : base(config, tokenService)
        {
        }
        public IActionResult Index()
        {
            if (Utils.IsCheckPemission("M_AC", "PER_VIEW") == true)
            {
                return View();
            }
            return Redirect("/Home");
        }
    }
}
