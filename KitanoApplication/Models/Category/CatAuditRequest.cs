using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace KitanoApplication.Models
{
    public class CatAuditRequest
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
        [JsonPropertyName("name")]
        public string Name { get; set; }
        [JsonPropertyName("code")]
        public string Code { get; set; }
        [JsonPropertyName("status")]
        public bool? Status { get; set; }
        [JsonPropertyName("description")]
        public string Description { get; set; }
        [JsonPropertyName("createdate")]
        public DateTime CreateDate { get; set; }
        [JsonPropertyName("createdat")]
        public DateTime? CreatedAt { get; set; }
        [JsonPropertyName("modifiedat")]
        public DateTime? ModifiedAt { get; set; }
        [JsonPropertyName("deletedat")]
        public DateTime DeletedAt { get; set; }
        [JsonPropertyName("createdBy")]
        public int? CreatedBy { get; set; }
        [JsonPropertyName("modifiedBy")]
        public int? ModifiedBy { get; set; }
        [JsonPropertyName("deletedBy")]
        public int? DeletedBy { get; set; }
        [JsonPropertyName("is_active")]
        public bool? IsActive { get; set; }
        [JsonPropertyName("is_deleted")]
        public bool? IsDeleted { get; set; }
    }
    public class CatAuditRequestCreateModel
    {
        [JsonPropertyName("code")]
        public string Code { get; set; }
        [JsonPropertyName("name")]
        public string Name { get; set; }
        [JsonPropertyName("status")]
        public bool? Status { get; set; }
        [JsonPropertyName("description")]
        public string Description { get; set; }
    }

    public class CatAuditRequestModifyModel
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
        [JsonPropertyName("name")]
        public string Name { get; set; }
        [JsonPropertyName("status")]
        public bool? Status { get; set; }
        [JsonPropertyName("description")]
        public string Description { get; set; }
    }
}
