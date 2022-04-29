using KitanoApplication.DataAccess;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KitanoApplication.Controllers.Dashboard
{
    public class AuditWorkDashBoardController : BaseController
    {
        public AuditWorkDashBoardController(IConfiguration config, ITokenService tokenService) : base(config, tokenService)
        {
        }
        public IActionResult Index()
        {
            if (Utils.IsCheckPemission("M_AWD", "PER_VIEW"))
            {
                return View();
            }
            return Redirect("/Home");
        }
    }
}
