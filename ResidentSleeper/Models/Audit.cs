using System;

namespace ResidentSleeper.Models
{
    public class Audit
    {
        //Audit Properties
        public Guid AuditID { get; set; }
        public string UserName { get; set; }
        public string IPAddress { get; set; }
        public string AreaAccessed { get; set; }
        public DateTime Timestamp { get; set; }

        //Default Constructor
        public Audit() { }
    }
}
