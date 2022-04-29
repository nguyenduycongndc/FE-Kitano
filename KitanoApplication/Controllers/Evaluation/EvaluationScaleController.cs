using KitanoApplication.DataAccess;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KitanoApplication.Controllers.Evaluation
{
    public class EvaluationScaleController : BaseController
    {
        public EvaluationScaleController(IConfiguration config, ITokenService tokenService) : base(config, tokenService)
        {
        }

        public IActionResult Index()
        {
            if (Utils.IsCheckPemission("M_ES", "PER_VIEW"))
            {
                return View();
            }
            return Redirect("/Home");
        }
    }
}
