using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using KitanoApplication.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using KitanoApplication.DataAccess;
using Microsoft.AspNetCore.Http;
using System.Net;
using Microsoft.AspNetCore.Authentication;
using System.Security.Cryptography;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json.Serialization;
using System.Text.Json;

namespace KitanoApplication.Controllers
{
    public class LoginController : Controller
    {

        public LoginController()
        {
        }
        [Route("login")]
        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }
        [AllowAnonymous]
        [Route("login")]
        [HttpPost]
        public async Task<IActionResult> Login(LoginModel userModel)
        {
            ServicePointManager.Expect100Continue = true;
            System.Net.ServicePointManager.SecurityProtocol |= SecurityProtocolType.Tls12;
            try
            {
                if (string.IsNullOrEmpty(userModel.UserName) || string.IsNullOrEmpty(userModel.Password))
                {
                    return new JsonResult(new { code = "0", token = "" });
                }
                var AutResult = new AutResult();
                var api_url = userModel.Host + "/Login";
                using (var httpClient = new HttpClient())
                {
                   
                    httpClient.BaseAddress = new Uri(api_url);
                    httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    StringContent content = new(JsonSerializer.Serialize(userModel), Encoding.UTF8, "application/json");
                    var response = await httpClient.PostAsync(api_url, content);
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    if (!string.IsNullOrEmpty(apiResponse))
                    {
                        AutResult = JsonSerializer.Deserialize<AutResult>(apiResponse);
                    }
                }
                if (AutResult != null)
                {
                    var generatedToken = AutResult.Token;
                    if (!string.IsNullOrEmpty(generatedToken))
                    {
                        HttpContext.Session.Clear();
                        HttpContext.Session.SetString("SessionToken", generatedToken);
                        HttpContext.Session.Set<CurrentUserModel>("UserInfo", AutResult.currentUsers);
                        HttpContext.Session.SetString("host_menu_service", userModel.Host + userModel.ActionMenu);
                        HttpContext.Response.StatusCode = (int)HttpStatusCode.OK;
                        Response.Cookies.Delete("language");
                        var _language = "vi-VN";
                        var option = new CookieOptions()
                        {
                            Expires = DateTime.Now.AddDays(1)
                        };
                        Response.Cookies.Append("language", _language, option);
                        return new JsonResult(new 
                        { 
                            code = "1", 
                            token = generatedToken, currentPermission = JsonSerializer.Serialize(AutResult.currentUsers.RoleList), 
                            currentUser = JsonSerializer.Serialize(new { id = AutResult.currentUsers.Id, user_name = AutResult.currentUsers.UserName, full_name = AutResult.currentUsers.FullName, department_id = AutResult.currentUsers.DepartmentId, user_type = AutResult.currentUsers.UsersType }), 
                            systemParam = JsonSerializer.Serialize(AutResult.systemParam),
                            approvalStatus = JsonSerializer.Serialize(AutResult.approvalstatus),
                        });
                    }
                    else
                    {
                        return new JsonResult(new { code = "0", token = "", currentPermission = "" });
                    }
                }
                else
                {
                    return new JsonResult(new { code = "0", token = "", currentPermission = "" });
                }
            }
            catch (Exception)
            {
                return new JsonResult(new { code = "0", token = "", currentPermission = "" });
            }

        }

        [AllowAnonymous]
        [Route("ApplyLogin")]
        [HttpPost]
        public bool ApplyLogin(AuthResultModel AutResult)
        {
            ServicePointManager.Expect100Continue = true;
            System.Net.ServicePointManager.SecurityProtocol |= SecurityProtocolType.Tls12;
            try
            {
                if (AutResult == null)
                {
                    return false;
                }
                var generatedToken = AutResult.Token;
                if (string.IsNullOrEmpty(generatedToken))
                {
                    return false;
                }
                HttpContext.Session.SetString("SessionToken", generatedToken);
                HttpContext.Session.Set<CurrentUserModel>("UserInfo", AutResult.currentUsersModel);
                HttpContext.Session.SetString("host_menu_service", AutResult.host + AutResult.actionmenu);
                HttpContext.Response.StatusCode = (int)HttpStatusCode.OK;
                Response.Cookies.Delete("language");
                var _language = "vi-VN";
                var option = new CookieOptions()
                {
                    Expires = DateTime.Now.AddDays(1)
                };
                Response.Cookies.Append("language", _language, option);
                return true;
            }
            catch (Exception)
            {
                return false;
            }

        }
        public string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }
        [AllowAnonymous]
        [HttpGet]
        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            return Redirect("/Login");
        }
        [AllowAnonymous]
        [HttpPost]
        public IActionResult ChangeLanguage(string key_value)
        {
            var _language = "vi-VN";
            if (key_value != null)
            {
                _language = key_value;
            }
            Response.Cookies.Delete("language");
            CookieOptions option = new()
            {
                Expires = DateTime.Now.AddDays(1)
            };
            Response.Cookies.Append("language", _language, option);
            return new JsonResult(new { result = true });
        }
        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        [AllowAnonymous]
        [HttpPost]
        public string MenuComponent([FromBody] List<MenuModels> apiResponse)
        {
            var result = "";
            try
            {
                var json = JsonSerializer.Serialize(apiResponse);
                result = json;
                HttpContext.Session.SetString("MenuData", json);
            }
            catch (Exception)
            {               
            }
            return result;
        }
    }
    public static class SessionExtensions
    {
        public static void Set<T>(this ISession session, string key, T value)
        {
            session.SetString(key, JsonSerializer.Serialize(value));
        }

        public static T Get<T>(this ISession session, string key)
        {
            var value = session.GetString(key);
            return value == null ? default : JsonSerializer.Deserialize<T>(value);
        }
    }
}
