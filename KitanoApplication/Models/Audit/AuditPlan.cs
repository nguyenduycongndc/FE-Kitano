using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace KitanoApplication.Models
{   
    public class AuditPlan
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
        [JsonPropertyName("name")]
        public string Name { get; set; }
        [JsonPropertyName("code")]
        public string Code { get; set; }
        [JsonPropertyName("year")]
        public int? Year { get; set; }
        [JsonPropertyName("status")]
        public int? Status { get; set; }
        [JsonPropertyName("target")]
        public string Target { get; set; }
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
        [JsonPropertyName("isactive")]
        public bool? IsActive { get; set; }
        [JsonPropertyName("isdelete")]
        public bool? IsDeleted { get; set; }
    }
    public class AuditPlanCreateModel
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

    public class AuditPlanModifyModel
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
