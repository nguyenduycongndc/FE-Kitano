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
    public class AuditDetectController : BaseController
    {
        private readonly IConfiguration _config;
        private readonly ITokenService _tokenService;
        private readonly ILogger<AuditDetectController> _logger;
        public AuditDetectController(IConfiguration config, ITokenService tokenService, ILogger<AuditDetectController> logger) : base(config, tokenService)
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
