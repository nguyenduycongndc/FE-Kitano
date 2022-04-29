using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Net.Http.Headers;
using KitanoApplication.Models;
using Microsoft.AspNetCore.Http;

namespace KitanoApplication.Components
{
    [ViewComponent(Name = "Menu")]
    public class MenuViewComponent : ViewComponent
    {
        //public async Task<IViewComponentResult> InvokeAsync(string host_service, string token)
        //{
        //    var menuModels = new List<MenuModels>();
        //    try
        //    {
        //        if (!string.IsNullOrEmpty(host_service))
        //        {
        //            var api_url = host_service;
        //            using var httpClient = new HttpClient();
        //            if (!string.IsNullOrEmpty(token))
        //                httpClient.DefaultRequestHeaders.Add("Authorization", $"BEARER {token}");

        //            httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        //            using var response = await httpClient.GetAsync(api_url);
        //            if (response.StatusCode == System.Net.HttpStatusCode.OK)
        //            {
        //                string apiResponse = await response.Content.ReadAsStringAsync();
        //                menuModels = JsonSerializer.Deserialize<List<MenuModels>>(apiResponse);
        //            }
        //        }

        //    }
        //    catch (Exception)
        //    {
        //    }

        //    return View(menuModels);
        //}

        public async Task<IViewComponentResult> InvokeAsync()
        {
            await Task.Delay(10);
            var menuModels = new List<MenuModels>();
            try
            {
                string apiResponse = HttpContext.Session.GetString("MenuData");
                if (!string.IsNullOrEmpty(apiResponse))
                {
                    menuModels = JsonSerializer.Deserialize<List<MenuModels>>(apiResponse);
                }

            }
            catch (Exception)
            {
            }

            return View(menuModels);
        }       
    }
}
