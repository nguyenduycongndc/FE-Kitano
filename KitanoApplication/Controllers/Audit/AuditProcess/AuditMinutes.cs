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
    public class AuditMinutesController : BaseController
    {
        private readonly IConfiguration _config;
        private readonly ITokenService _tokenService;
        private readonly ILogger<AuditMinutesController> _logger;
        public AuditMinutesController(IConfiguration config, ITokenService tokenService, ILogger<AuditMinutesController> logger) : base(config, tokenService)
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
