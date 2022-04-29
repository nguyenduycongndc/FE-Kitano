using KitanoApplication.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace KitanoApplication.DataAccess
{
    public class CustomAuthorizeAttribute : TypeFilterAttribute
    {
        public CustomAuthorizeAttribute() : base(typeof(CustomAuthorizeFilter))
        {
        }
    }
    public class CustomAuthorizeFilter : IAuthorizationFilter
    {
        //private string _userInfoPrex = "Auth.UserInfo.{0}";
        private readonly IConfiguration _config;
       
        public CustomAuthorizeFilter(IConfiguration config)
        {
            _config = config;
        }
        public static void Set<T>(ISession session, string key, T value)
        {
            session.SetString(key, JsonSerializer.Serialize(value));
        }

        public static T Get<T>(ISession session, string key)
        {
            var value = session.GetString(key);
            return value == null ? default : JsonSerializer.Deserialize<T>(value);
        }
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var Secret = _config["Jwt:Key"].ToString();

            string token = context.HttpContext.Session.GetString("SessionToken");

            var jwtToken = GetTokenInfo(token, Secret);
            if (jwtToken == null)
            {
                context.Result = new RedirectResult("~/Login");
                return;
            }
            //var userId = jwtToken.Claims.First(x => x.Type == "username").Value;
            var user = Get<CurrentUserModel>(context.HttpContext.Session, "UserInfo");
            if (user == null)
            {
                context.Result = new RedirectResult("~/Login");
                return;
            }
            var identity = new ClaimsIdentity(user.UserName);
            context.HttpContext.User = new ClaimsPrincipal(identity);
            context.HttpContext.Items["UserInfo"] = user;
            var IsAuthenticated = context.HttpContext.User.Identity.IsAuthenticated;
            if (!IsAuthenticated)
            {
                if (context.HttpContext.Request.Headers["x-requested-with"] == "XMLHttpRequest")
                {
                    context.HttpContext.Response.StatusCode = (int)HttpStatusCode.Unauthorized; //Set HTTP 401                         
                }
                context.Result = new RedirectResult("~/Login");
            }           
            
            return;
        }
        public static bool IsTokenValid(string key, string issuer, string token)
        {
            var mySecret = Encoding.UTF8.GetBytes(key);
            var mySecurityKey = new SymmetricSecurityKey(mySecret);
            var tokenHandler = new JwtSecurityTokenHandler();
            try
            {
                tokenHandler.ValidateToken(token,
                new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidIssuer = issuer,
                    ValidAudience = issuer,
                    ClockSkew = TimeSpan.Zero,
                    IssuerSigningKey = mySecurityKey,
                }, out SecurityToken validatedToken);
            }
            catch
            {
                return false;
            }
            return true;
        }
        public static JwtSecurityToken GetTokenInfo(string token, string secret)
        {
            SecurityToken validatedToken;
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(secret);
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                }, out validatedToken);
                return (JwtSecurityToken)validatedToken;
            }
            catch (Exception)
            {
                return null;
            }

        }
        public ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = true, //you might want to validate the audience and issuer depending on your use case
                ValidateIssuer = true,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345")),
                ValidateLifetime = false //here we are saying that we don't care about the token's expiration date
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken;
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);
            var jwtSecurityToken = securityToken as JwtSecurityToken;
            if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                throw new SecurityTokenException("Invalid token");
            return principal;
        }
    }
}