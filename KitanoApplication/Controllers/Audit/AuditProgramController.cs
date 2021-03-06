using KitanoApplication.DataAccess;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KitanoApplication.Controllers
{
    public class AuditProgramController : BaseController
    {
        public AuditProgramController(IConfiguration config, ITokenService tokenService, ILogger<UsersController> logger) : base(config, tokenService)
        {

        }
        public IActionResult Index()
        {
            if (Utils.IsCheckPemission("M_APRG", "PER_VIEW") == true)
            {
                return View();
            }
            else
            {
                return Redirect("/Home");
            }
        }
        public IActionResult Detail()
        {
            return View();
        }
    }
}
