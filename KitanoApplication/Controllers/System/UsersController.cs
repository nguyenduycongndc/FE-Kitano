using KitanoApplication.DataAccess;
using KitanoApplication.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KitanoApplication.Controllers
{
    public class UsersController : BaseController
    {
        public UsersController(IConfiguration config, ITokenService tokenService) : base(config, tokenService)
        {
        }
        // GET: UsersController
        public ActionResult Index()
        {
            if(Utils.IsCheckPemission("M_U", "PER_VIEW") == true)
            {
                return View();
            }
            else
            {
                return Redirect("/Home");
            }
        }   
        // GET: UsersController/Details/5
        public IActionResult Details(int id)
        {
            var models = new UsersModifyModels();
            return View(models);
        }

        // GET: UsersController/Create
        public ActionResult Create()
        {
            return View();
        }

        // GET: UsersController/Edit/5
        public IActionResult Edit(int id)
        {
            var models = new UsersModifyModels();
            return View(models);
        }

    }
}
