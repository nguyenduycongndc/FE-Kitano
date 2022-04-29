using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace KitanoApplication.Models
{
    public class AutResult
    {
        [JsonPropertyName("token")]
        public string Token { get; set; }
        [JsonPropertyName("result")]
        public bool Result { get; set; }
        [JsonPropertyName("errors")]
        public List<string> Errors { get; set; }
        public CurrentUserModel currentUsers { get; set; }
        public List<SystemParam> systemParam { get; set; }
        public List<ApprovalStatusFunction> approvalstatus { get; set; }
    }
    public class SystemParam
    {
        public int? id { get; set; }
        public string name { get; set; }
        public string value { get; set; }
    }
    public class ApprovalStatusFunction
    {
        public string function_code { get; set; }
        public string status_code { get; set; }
        public string status_name { get; set; }
        public int? level { get; set; }
        public int? outside { get; set; }
    }
    public class AuthResultModel
    {
        [JsonPropertyName("token")]
        public string Token { get; set; }

        public CurrentUserModel currentUsersModel { get { return !string.IsNullOrEmpty(this.currentUsers) ? JsonSerializer.Deserialize<CurrentUserModel>(this.currentUsers) : new CurrentUserModel(); } }
        public string host { get; set; }
        public string actionmenu { get; set; }
        public string currentUsers { get; set; }

    }
}
