using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using KitanoApplication.DataAccess;
namespace KitanoApplication.Controllers
{
    public class BussinessActivitiesController : BaseController
    {
        public BussinessActivitiesController(IConfiguration config, ITokenService tokenService) : base(config, tokenService)
        {
        }
        public IActionResult Index()
        {
            if (Utils.IsCheckPemission("M_BA", "PER_VIEW") == true)
            {
                return View();
            }
            return Redirect("/Home");
        }
    }
}
