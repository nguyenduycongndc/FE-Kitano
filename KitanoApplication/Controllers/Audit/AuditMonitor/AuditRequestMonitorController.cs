using System.Linq;
using System.Threading.Tasks;
using KitanoApplication.DataAccess;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using KitanoApplication.Models;
using System.Net.Http;

namespace KitanoApplication.Controllers
{
    public class AuditRequestMonitorController : BaseController
    {
        public AuditRequestMonitorController(IConfiguration config, ITokenService tokenService, ILogger<AuditRequestMonitorController> logger) : base(config, tokenService)
        {
        }

        public ActionResult Index()
        {
            if (Utils.IsCheckPemission("M_ARMN", "PER_VIEW"))
            {
                return View();
            }
            return Redirect("/Home");
        }
    }
}
