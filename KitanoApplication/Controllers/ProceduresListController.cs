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
    public class ProceduresListController : BaseController
    {
        private readonly IConfiguration _config;
        private readonly ITokenService _tokenService;
        private readonly ILogger<UsersController> _logger;
        public ProceduresListController(IConfiguration config, ITokenService tokenService, ILogger<UsersController> logger) : base(config, tokenService)
        {
            _tokenService = tokenService;
            _config = config;
            _logger = logger;
        }
        public ActionResult Index()
        {
            return View();
        }
    }
}
