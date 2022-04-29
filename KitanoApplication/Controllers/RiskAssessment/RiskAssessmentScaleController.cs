using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using KitanoApplication.DataAccess;

namespace KitanoApplication.Controllers
{
    public class RiskAssessmentScaleController : BaseController
    {
        public RiskAssessmentScaleController(IConfiguration config, ITokenService tokenService) : base(config, tokenService)
        {
        }
        public IActionResult Index()
        {
            if (Utils.IsCheckPemission("M_RAS", "PER_VIEW") == true)
            {
                return View();
            }
            return Redirect("/Home"); ;
        }
    }
}
