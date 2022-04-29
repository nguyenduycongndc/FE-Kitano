using KitanoApplication.DataAccess;
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
    public class UsersGroupController : BaseController
    {
        public UsersGroupController(IConfiguration config, ITokenService tokenService) : base(config, tokenService)
        {
        }
        // GET: UsersGroupController


        public ActionResult Index()
        {
            if (Utils.IsCheckPemission("M_UG", "PER_VIEW") == true)
            {
                return View();
            }
            else
            {
                return Redirect("/Home");
            }
        }
        // GET: UsersGroupController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }
        // GET: UsersGroupController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: UsersGroupController/Create

        // GET: UsersGroupController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: UsersGroupController/Edit/5

        // GET: UsersGroupController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }
    }
}
