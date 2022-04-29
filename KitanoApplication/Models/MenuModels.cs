using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace KitanoApplication.Models
{
    public class MenuModels
    {
        [JsonPropertyName("id")]
        public int? Id { get; set; }

        [JsonPropertyName("parent_id")]
        public int? ParentID { get; set; }

        [JsonPropertyName("code_name")]
        public string CodeName { get; set; }

        [JsonPropertyName("description")]
        public string Description { get; set; }

        [JsonPropertyName("controller")]
        public string Controller { get; set; }

        [JsonPropertyName("action")]
        public string Action { get; set; }

        [JsonPropertyName("default_url")]
        public string DefaultUrl { get; set; }

        [JsonPropertyName("icon")]
        public string Icon { get; set; }

        [JsonPropertyName("ancestor")]
        public string Ancestor { get; set; }

        [JsonPropertyName("sort_order")]
        public int? SortOrder { get; set; }

        [JsonPropertyName("is_menu")]
        public bool? IsMenu { get; set; }

        [JsonPropertyName("is_active")]
        public bool? IsActive { get; set; }
    }
}
