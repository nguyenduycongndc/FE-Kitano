using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace KitanoApplication.Models
{
    public class UserViewModel
	{
        [JsonPropertyName( "id")]
        public int? Id { get; set; }

        [JsonPropertyName( "full_name")]
        public string FullName { get; set; }

        [JsonPropertyName( "user_name")]
        public string UserName { get; set; }

        [JsonPropertyName( "is_active")]
        public bool? IsActive { get; set; }

        [JsonPropertyName( "is_deleted")]
        public bool? IsDeleted { get; set; }

        [JsonPropertyName( "email")]
        public string Email { get; set; }

        [JsonPropertyName( "phone_number")]
        public string PhoneNumber { get; set; }

        [JsonPropertyName( "date_of_birth")]
        public DateTime? DateOfBirth { get; set; }

        [JsonPropertyName( "avartar")]
        public string Avartar { get; set; }

        [JsonPropertyName( "last_online_at")]
        public DateTime? LastOnline { get; set; }

        [JsonPropertyName( "roleId")]
        public int? RoleId { get; set; }
    }

    public class UsersModifyModels
    {
        [JsonPropertyName( "id")]
        public int? Id { get; set; }

        [JsonPropertyName( "full_name")]
        public string FullName { get; set; }

        [JsonPropertyName( "user_name")]
        public string UserName { get; set; }

        [JsonPropertyName( "is_active")]
        public bool? IsActive { get; set; }

        [JsonPropertyName( "email")]
        public string Email { get; set; }

        public string str_DateOfJoining { get; set; }

        [JsonPropertyName( "avartar")]
        public string Avartar { get; set; }

        [JsonPropertyName( "roleId")]
        public int? RoleId { get; set; }

        [JsonPropertyName( "password")]
        public string Password { get; set; }

        [JsonPropertyName( "date_of_joining")]
        public DateTime? DateOfJoining { get; set; }

        [JsonPropertyName( "users_type")]
        public int? UsersType { get; set; }

        [JsonPropertyName( "department_id")]
        public int? DepartmentId { get; set; }

        [JsonPropertyName( "users_group")]
        public List<int> UsersGroup { get; set; }
    }
}
