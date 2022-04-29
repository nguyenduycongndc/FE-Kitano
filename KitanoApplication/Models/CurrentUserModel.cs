using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace KitanoApplication.Models
{
    public class CurrentUserModel
    {
        [JsonPropertyName("id")]
        public int? Id { get; set; }
        [JsonPropertyName("full_name")]
        public string FullName { get; set; }
        [JsonPropertyName("user_name")]
        public string UserName { get; set; }
        [JsonPropertyName("role_id")]
        public int? RoleId { get; set; }
        [JsonPropertyName("domain_id")]
        public int? DomainId { get; set; }
        [JsonPropertyName("users_type")]
        public int? UsersType { get; set; }
        [JsonPropertyName("role_list")]
        public List<RolesFunctionModel> RoleList { get; set; }
        [JsonPropertyName("department_id")]
        public int? DepartmentId { get; set; }
    }
    public class RolesFunctionModel
    {
        [JsonPropertyName("role_id")]
        public int? RolesId { get; set; }
        [JsonPropertyName("menu_id")]
        public int? MenuId { get; set; }
        [JsonPropertyName("permission")]
        public string Permission { get; set; }
    }
}
