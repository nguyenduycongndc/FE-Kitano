using KitanoApplication.DataAccess;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace KitanoApplication.Controllers.Evaluation
{
    public class EvaluationComplianceController : BaseController
    {
        public EvaluationComplianceController(IConfiguration config, ITokenService tokenService) : base(config, tokenService)
        {
        }

        public IActionResult Index()
        {
            if (Utils.IsCheckPemission("M_ECL", "PER_VIEW"))
            {
                return View();
            }
            return Redirect("/Home");
        }
    }
}
