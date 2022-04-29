using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace KitanoApplication.Models
{
    public class UnitTypeModel
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
        [JsonPropertyName("name")]
        public string Name { get; set; }
        [JsonPropertyName("is_deleted")]
        public bool? IsDeleted { get; set; }
        [JsonPropertyName("status")]
        public bool? Status { get; set; }
        [JsonPropertyName("description")]
        public string Description { get; set; }
        [JsonPropertyName("createdAt")]
        public DateTime? CreatedAt { get; set; }
        [JsonPropertyName("modifiedAt")]
        public DateTime? ModifiedAt { get; set; }
        [JsonPropertyName("deletedAt")]
        public DateTime? DeletedAt { get; set; }
        [JsonPropertyName("createdBy")]
        public int? CreatedBy { get; set; }
        [JsonPropertyName("modifiedBy")]
        public int? ModifiedBy { get; set; }
        [JsonPropertyName("deletedBy")]
        public int? DeletedBy { get; set; }
    }
    public class UnitTypeCreateModel
    {
        [JsonPropertyName("name")]
        public string Name { get; set; }
        [JsonPropertyName("status")]
        public bool? Status { get; set; }
        [JsonPropertyName("description")]
        public string Description { get; set; }
    }
    public class UnitTypeModifyModel
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
