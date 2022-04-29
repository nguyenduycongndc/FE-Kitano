using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace KitanoApplication.Models
{
    public class LanguageItem
    {
        public LanguageItem()
        {
        }

        public override string ToString()
        {
            return $"{CultureCode} - {Name}";
        }
        public CultureInfo GetCulture()
        {
            return new CultureInfo(CultureCode);
        }

        public string Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string CultureCode { get; set; }
    }
}
