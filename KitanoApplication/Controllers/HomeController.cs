using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using KitanoApplication.Models;
using Microsoft.Extensions.Configuration;
using KitanoApplication.DataAccess;
using Microsoft.AspNetCore.Http;

namespace KitanoApplication.Controllers
{
    public class HomeController : BaseController
    {
        public HomeController(IConfiguration config, ITokenService tokenService,ILogger<HomeController> logger) : base(config, tokenService)
        {
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
