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
    public class SystemLogController : BaseController
    {
        public SystemLogController(IConfiguration config, ITokenService tokenService) : base(config, tokenService)
        {
        }
        public ActionResult Index()
        {
            return View();
        }
    }
}
