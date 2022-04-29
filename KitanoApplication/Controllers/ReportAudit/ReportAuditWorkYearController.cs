using KitanoApplication.DataAccess;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KitanoApplication.Controllers.ReportAudit
{
    public class ReportAuditWorkYearController : BaseController
    {
        public ReportAuditWorkYearController(IConfiguration config, ITokenService tokenService) : base(config, tokenService)
        {

        }
        public IActionResult Index()
        {
            if (Utils.IsCheckPemission("M_RAP", "PER_VIEW"))
            {
                return View();
            }
            else
            {
                return Redirect("/Home");
            }
        }
    }
}
