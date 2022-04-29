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
    public class CatAuditRequestController : BaseController
    {
        private readonly IConfiguration _config;
        private readonly ITokenService _tokenService;
        private readonly ILogger<CatAuditRequestController> _logger;        

        public CatAuditRequestController(IConfiguration config, ITokenService tokenService, ILogger<CatAuditRequestController> logger) : base(config, tokenService)
        {
            _tokenService = tokenService;
            _config = config;
            _logger = logger;
        }

        // GET: DeparmentController
        public ActionResult Index()
        {
            return View();
        }       
    }
}
