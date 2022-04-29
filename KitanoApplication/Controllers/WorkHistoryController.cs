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
    public class WorkHistoryController : BaseController
    {
        public WorkHistoryController(IConfiguration config, ITokenService tokenService, ILogger<WorkHistoryController> logger) : base(config, tokenService)
        {
        }
        public IActionResult Index()
        {
            return View();
        }
    }
}
