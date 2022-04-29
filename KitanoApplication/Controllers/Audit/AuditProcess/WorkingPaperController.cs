using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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
    public class WorkingPaperController : BaseController
    {
        public WorkingPaperController(IConfiguration config, ITokenService tokenService, ILogger<WorkingPaperController> logger) : base(config, tokenService)
        {
        }

        public ActionResult Index()
        {
            if (Utils.IsCheckPemission("M_WP", "PER_VIEW"))
            {
                return View();
            }
            return Redirect("/Home");

        }
    }
}
