using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace KitanoApplication.Models
{
    public class LoginModel
    {
        [JsonPropertyName("user_name")]
        public string UserName { get; set; }
        [JsonPropertyName("password")]
        public string Password { get; set; }
        [JsonPropertyName("host")]
        public string Host { get; set; }
        [JsonPropertyName("actionmenu")]
        public string ActionMenu { get; set; }
        [JsonPropertyName("type_login")]
        public int TypeLogin { get; set; }
    }

}
