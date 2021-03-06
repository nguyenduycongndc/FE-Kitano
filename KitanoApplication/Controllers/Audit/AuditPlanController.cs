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
    public class AuditPlanController : BaseController
    {
        private readonly IConfiguration _config;
        private readonly ITokenService _tokenService;
        private readonly ILogger<AuditPlanController> _logger;
        public AuditPlanController(IConfiguration config, ITokenService tokenService, ILogger<AuditPlanController> logger) : base(config, tokenService)
        {
            _tokenService = tokenService;
            _config = config;
            _logger = logger;
        }

        public ActionResult Index()
        {
            if (Utils.IsCheckPemission("M_AP", "PER_VIEW") == true)
            {
                return View();
            }
            else
            {
                return Redirect("/Home");
            }
        }
        public ActionResult Scope()
        {
            return View();
        }
    }
}