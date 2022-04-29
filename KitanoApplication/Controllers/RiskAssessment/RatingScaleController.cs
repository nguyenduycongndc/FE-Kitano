using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using KitanoApplication.DataAccess;

namespace KitanoApplication.Controllers
{
    public class RatingScaleController : BaseController
    {
        public RatingScaleController(IConfiguration config, ITokenService tokenService) : base(config, tokenService)
        {
        }
        public IActionResult Index()
        {
            if (Utils.IsCheckPemission("M_RS", "PER_VIEW") == true)
            {
                return View();
            }
            return Redirect("/Home");
        }
    }
}
