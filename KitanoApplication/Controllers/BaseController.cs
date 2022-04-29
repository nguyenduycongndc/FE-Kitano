using KitanoApplication.DataAccess;
using KitanoApplication.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace KitanoApplication.Controllers
{
    [CustomAuthorize]
    public class BaseController : Controller
    {
        private CurrentUserModel _currentUser = null;
        protected CurrentUserModel CurrentUser
        {
            get
            {
                if (_currentUser == null) _currentUser = GetUser();
                return _currentUser;
            }
        }
        public BaseController(IConfiguration config, ITokenService tokenService)
        {
        }

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var _language = "vi-VN";
            var cookie = Request.Cookies["language"];
            if (cookie != null)
            {
                _language = cookie;
            }
            else
            {
                CookieOptions option = new()
                {
                    Expires = DateTime.Now.AddDays(1)
                };
                Response.Cookies.Append("language", _language, option);
            }
            System.Threading.Thread.CurrentThread.CurrentCulture = new CultureInfo(_language);
            System.Threading.Thread.CurrentThread.CurrentUICulture = new CultureInfo(_language);

            Request.Headers["Accept-Language"] = _language;
            base.OnActionExecuting(context);
        }

        #region GetUser
        protected CurrentUserModel GetUser()
        {
            var userModel = HttpContext.Items["UserInfo"];

            return (CurrentUserModel)userModel;
        }
        #endregion
    }
}
